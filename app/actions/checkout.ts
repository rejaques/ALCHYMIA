"use server"
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from 'next/navigation';
import { client } from '@/sanity/lib/sanity'; // Importamos o cliente do Sanity

const mpClient = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN || ''
});

export async function createCheckout(formData: FormData) {
    let checkoutUrl: string | undefined;

    try {
        // 1. Pegamos o ID do produto que enviamos pelo formulário
        const productId = formData.get('productId') as string;

        // 2. Buscamos o preço REAL e o nome no Sanity (Segurança em 1º lugar)
        const product = await client.fetch(
            `*[_id == $productId][0]{name, price}`,
            { productId }
        );

        if (!product) {
            throw new Error("Produto não encontrado no banco de dados.");
        }

        // 3. Criamos a preferência no Mercado Pago com os dados do Sanity
        const preference = new Preference(mpClient);
        const result = await preference.create({
            body: {
                items: [
                    {
                        id: productId,
                        title: `Alchymia | ${product.name}`,
                        quantity: 1,
                        unit_price: product.price, // Preço vindo direto do Sanity
                        currency_id: 'BRL',
                    }
                ],

                external_reference: productId,

                back_urls: {
                    success: 'https://alchymiaparfums.com/sucesso',
                    failure: 'https://alchymiaparfums.com/produto/silentivm',
                },
                auto_return: 'approved',
            }
        });

        checkoutUrl = result.init_point;

    } catch (error) {
        console.error("Erro no checkout:", error);
    }

    // 4. Redirecionamento (sempre fora do try/catch no Next.js)
    if (checkoutUrl) {
        redirect(checkoutUrl);
    }
}