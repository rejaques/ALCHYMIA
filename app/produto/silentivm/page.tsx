import Image from 'next/image';
import { PRODUCT_SILENTIVM } from '@/constants/product';
import { createCheckout } from '@/app/actions/checkout';

export default function SilentivmPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Container Principal */}
            <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Lado Esquerdo: Visual do Produto */}
                <div className="relative group">
                    <div className="aspect-[4/5] w-full bg-neutral-900 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                        {/* Aqui você colocará a imagem que geramos ou o mockup real */}
                        <p className="text-neutral-600 italic uppercase tracking-widest text-xs">
                            [ Imagem do Silentivm Lote 01 ]
                        </p>
                    </div>
                    <p className="mt-4 text-[10px] text-neutral-500 tracking-[0.3em] uppercase">
                        Frasco artesanal • Lote numerado
                    </p>
                </div>

                {/* Lado Direito: Checkout e Detalhes */}
                <div className="flex flex-col justify-center space-y-8">
                    <header>
                        <span className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase">Alchymia Parfums</span>
                        <h1 className="text-6xl font-serif mt-2 tracking-tighter">{PRODUCT_SILENTIVM.name}</h1>
                        <p className="text-xl text-neutral-400 font-light italic mt-2">{PRODUCT_SILENTIVM.type} • {PRODUCT_SILENTIVM.volume}</p>
                    </header>

                    <p className="text-neutral-300 leading-relaxed font-light max-w-md">
                        {PRODUCT_SILENTIVM.description}
                    </p>

                    <div className="pt-6 border-t border-white/10">
                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl font-serif tracking-tight">R$ {PRODUCT_SILENTIVM.price},00</span>
                            <span className="text-neutral-500 line-through text-sm">R$ {PRODUCT_SILENTIVM.old_price},00</span>
                        </div>

                        {/* Chamada para o Checkout (Botão) */}
                        <form action={createCheckout}>
                            <button
                                type="submit"
                                className="w-full bg-[#D4AF37] hover:bg-[#C19A2E] text-black font-bold py-5 px-10 transition-all duration-300 uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                            >
                                Reservar Unidade do Lote 01
                            </button>
                        </form>

                        <p className="text-[10px] text-center text-neutral-500 mt-4 uppercase tracking-widest">
                            Pagamento seguro via Mercado Pago • 12x no cartão
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}