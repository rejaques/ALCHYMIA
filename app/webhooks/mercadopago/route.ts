import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from 'next-sanity';

export const dynamic = 'force-dynamic';

const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });

const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim(),
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production',
    apiVersion: '2024-03-07',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
});

export async function POST(request: Request) {
    console.log("--- 📥 NOVO WEBHOOK RECEBIDO ---");

    try {
        const body = await request.json();
        console.log("📦 Body do MP:", JSON.stringify(body, null, 2));

        // 1. Verificar se é um evento de pagamento
        // O MP envia 'type' ou 'action'. Vamos garantir que pegamos o ID.
        const paymentId = body.data?.id || (body.type === 'payment' ? body.resource?.split('/').pop() : null);

        if (!paymentId) {
            console.log("⚠️ Webhook recebido sem ID de pagamento válido.");
            return NextResponse.json({ status: 'ignored' });
        }

        console.log(`🔍 Buscando detalhes do pagamento: ${paymentId}`);
        const payment = await new Payment(mpClient).get({ id: paymentId });

        console.log(`💳 Status do Pagamento: ${payment.status}`);
        console.log(`🔗 External Reference (ID do Sanity): ${payment.external_reference}`);

        // 2. Só baixa estoque se for aprovado E tiver o ID do produto
        if (payment.status === 'approved') {
            const productId = payment.external_reference;

            if (productId) {
                console.log(`🚀 Tentando baixar estoque do produto: ${productId}`);

                const result = await sanityClient
                    .patch(productId)
                    .setIfMissing({ stock: 0 })
                    .dec({ stock: 1 })
                    .commit();

                console.log("✅ SUCESSO: Estoque atualizado no Sanity!", result.stock);
            } else {
                console.log("❌ ERRO: O pagamento não tinha o 'external_reference' (ID do produto).");
            }
        }

        return new Response(JSON.stringify({ status: 'ok' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(`Erro: ${error}`, { status: 500 });
    }
}

// Adicione isso no seu route.ts logo abaixo da função POST
export async function GET() {
    return NextResponse.json({
        status: "alive",
        message: "A rota está operante. Se você chegou aqui via POST, houve um redirecionamento no caminho."
    });
}