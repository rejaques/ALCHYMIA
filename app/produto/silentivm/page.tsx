import Image from 'next/image';
import { createCheckout } from '@/app/actions/checkout';
import { client } from '@/sanity/lib/sanity';
import { notFound } from 'next/navigation';

// 1. Buscamos os dados no Sanity
async function getProduct() {
    // Trocamos $slug por "silentivm" direto na string (repare nas aspas duplas)
    const query = `*[_type == "product" && slug.current == "silentivm"][0]{
        _id,
        name,
        price,
        oldPrice,
        description,
        "imageUrl": image.asset->url,
        stock
    }`;

    return await client.fetch(query); // Aqui não precisa de segundo argumento
}

export default async function SilentivmPage() {
    const product = await getProduct();

    // Caso você mude o slug no Sanity e esqueça de atualizar aqui
    if (!product) return notFound();

    const isOutOfStock = product.stock <= 0;

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Lado Esquerdo: Imagem Dinâmica */}
                <div className="relative group">
                    <div className="aspect-[4/5] w-full bg-neutral-900 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                        {product.imageUrl ? (
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <p className="text-neutral-600 italic uppercase tracking-widest text-xs">
                                Sem imagem no Sanity
                            </p>
                        )}
                    </div>
                    <p className="mt-4 text-[10px] text-neutral-500 tracking-[0.3em] uppercase">
                        Frasco artesanal • Lote numerado
                    </p>
                </div>

                {/* Lado Direito: Dados Dinâmicos */}
                <div className="flex flex-col justify-center space-y-8">
                    <header>
                        <span className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase">Alchymia Parfums</span>
                        <h1 className="text-6xl font-serif mt-2 tracking-tighter">{product.name}</h1>
                        <p className="text-xl text-neutral-400 font-light italic mt-2">Parfum • 100ml</p>
                    </header>

                    <p className="text-neutral-300 leading-relaxed font-light max-w-md">
                        {product.description}
                    </p>

                    <div className="pt-6 border-t border-white/10">
                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl font-serif tracking-tight">
                                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>

                            {/* Só renderiza se o oldPrice estiver preenchido no Sanity */}
                            {product.oldPrice && (
                            <span className="text-neutral-500 line-through text-sm italic">
                                R$ {product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                                                    )}
                        </div>

                        <form action={createCheckout}>
                            {/* Passamos o ID do produto para a Action saber o que estamos comprando */}
                            <input type="hidden" name="productId" value={product._id} />

                            <button
                                type="submit"
                                disabled={isOutOfStock}
                                className={`w-full font-bold py-5 px-10 uppercase tracking-[0.2em] text-sm
                                           transition-all duration-300 ease-in-out
                                           ${isOutOfStock
                                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                                    : "bg-[#D4AF37] text-black hover:bg-[#f3ca4c] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                                }
                                           active:scale-[0.98] ring-offset-2 focus:ring-2 focus:ring-[#D4AF37]`}
                            >
                                {isOutOfStock ? "Lote 01 Esgotado" : "Reservar Unidade do Lote 01"}
                            </button>
                        </form>

                        <p className="text-[10px] text-center text-neutral-500 mt-4 uppercase tracking-widest">
                            {isOutOfStock
                                ? "Fique atento ao próximo lote"
                                : `Apenas ${product.stock} unidades restantes no Lote 01`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}