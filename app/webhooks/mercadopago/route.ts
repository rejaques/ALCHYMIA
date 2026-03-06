import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN || ''
});

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('data.id');

    // O Mercado Pago avisa sobre várias coisas, queremos apenas pagamentos
    if (type === 'payment' && id) {
        try {
            const payment = await new Payment(client).get({ id });

            if (payment.status === 'approved') {
                const customerEmail = payment.payer?.email;
                const amount = payment.transaction_amount;

                console.log(`✅ Pagamento Aprovado! Cliente: ${customerEmail}, Valor: ${amount}`);

                // TODO: Aqui você vai chamar a sua função de:
                // 1. Marcar na planilha que esse e-mail agora é "CLIENTE LOTE 01"
                // 2. Disparar o e-mail de "Boas-vindas ao Lote 01" via Resend
            }
        } catch (error) {
            console.error('Erro ao processar Webhook:', error);
        }
    }

    // Sempre responda 200 para o Mercado Pago não ficar tentando reenviar
    return NextResponse.json({ received: true }, { status: 200 });
}