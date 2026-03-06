"use server"
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from 'next/navigation';

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN || ''
});

// Adicionamos o parâmetro formData para satisfazer o contrato do React/Next
export async function createCheckout(formData: FormData) {
    let checkoutUrl: string | undefined;

    try {
        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items: [
                    {
                        id: 'silentivm-01',
                        title: 'Alchymia | Silentivm - Lote 01',
                        quantity: 1,
                        unit_price: 480.00,
                        currency_id: 'BRL',
                    }
                ],
                back_urls: {
                    success: 'https://alchymiaparfums.com/sucesso',
                    failure: 'https://alchymiaparfums.com/produto/silentivm',
                },
                auto_return: 'approved',
            }
        });

        checkoutUrl = result.init_point;

    } catch (error) {
        // Logamos o erro no servidor para debug
        console.error("Erro no processamento do Mercado Pago:", error);

        // Em Server Actions simples, se der erro e você não redirecionar,
        // o usuário simplesmente continuará na página atual.
    }

    // O redirect DEVE ficar fora do try/catch.
    // No Next.js, o redirect funciona lançando um erro interno,
    // se o catch pegar esse erro, o redirecionamento morre.
    if (checkoutUrl) {
        redirect(checkoutUrl);
    }
}