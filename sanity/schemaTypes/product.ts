export const product = {
    name: 'product',
    title: 'Produtos',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Nome do Perfume',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
        },
        {
            name: 'oldPrice',
            title: 'Preço Original (De)',
            type: 'number',
        },
        {
            name: 'price',
            title: 'Preço de Venda (Por)',
            type: 'number',
            validation: (Rule: any) => Rule.required().min(0),
        },
        {
            name: 'description',
            title: 'Descrição Noir',
            type: 'text',
        },
        {
            name: 'productImage', // Mudei de 'image' para 'productImage' só para testar
            title: 'Imagem do Frasco',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'stock', // Mudei de 'stock' para 'inventory' só para testar
            title: 'Estoque do Lote 01',
            type: 'number',
        }
    ],
}