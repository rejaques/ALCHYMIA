import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from 'next-sanity';

const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });

// Cliente Sanity com permissão de ESCREVER
const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-03-07',
    token: process.env.SANITY_WRITE_TOKEN, // O token 'sk...' que você acabou de gerar
    useCdn: false,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const paymentId = body.data?.id;

        if (body.type === 'payment' && paymentId) {
            const payment = await new Payment(mpClient).get({ id: paymentId });

            if (payment.status === 'approved') {
                // Pegamos o ID do produto que guardamos lá no external_reference
                const productId = payment.external_reference;

                if (productId) {
                    // MÁGICA: Diminuir 1 do estoque de forma atômica
                    await sanityClient
                        .patch(productId)
                        .setIfMissing({ stock: 0 })
                        .dec({ stock: 1 })
                        .commit();

                    console.log(`✅ Estoque do produto ${productId} reduzido!`);
                }
            }
        }
        return NextResponse.json({ status: 'ok' });
    } catch (error) {
        console.error('Erro no Webhook:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}