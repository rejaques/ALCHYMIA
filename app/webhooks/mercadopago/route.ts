import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN || ''
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // O Mercado Pago envia o ID do pagamento no corpo ou na query
        // Dependendo da versão, pode vir como data.id
        const paymentId = body.data?.id || body.resource?.split('/').pop();

        if (body.type === 'payment' && paymentId) {
            const payment = await new Payment(client).get({ id: paymentId });

            if (payment.status === 'approved') {
                const email = payment.payer?.email;
                console.log(`💰 SUCESSO: O cliente ${email} comprou o Silentivm!`);

                // AQUI É ONDE A MÁGICA ACONTECE:
                // 1. Chamar sua função do Google Sheets para marcar como "PAGO".
                // 2. Chamar o Resend para enviar o e-mail: "Seu Lote 01 está reservado".
            }
        }

        return NextResponse.json({ status: 'ok' }, { status: 200 });
    } catch (error) {
        console.error('Erro no Webhook:', error);
        return NextResponse.json({ error: 'Webhook Handler Failed' }, { status: 500 });
    }
}