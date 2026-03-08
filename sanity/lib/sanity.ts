import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-03-07",
    useCdn: false, // Coloque false para ver as mudanças de preço na hora
});

// Helper para transformar a referência de imagem do Sanity em URL real
const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
    return builder.image(source);
}