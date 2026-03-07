import Link from 'next/link';
import Image from 'next/image';

export default function SuccessPage() {
    return (
        <main className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center px-6 overflow-hidden">

            {/* IMAGEM DE FUNDO - Atmosférica */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Image
                    src="/images/success-bg.png"
                    alt="Alchymia Atmosphere"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradiente para garantir que o texto "salte" da tela */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            <div className="relative z-10 max-w-2xl space-y-8 animate-fade-in">

                <header className="space-y-2">
          <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] font-bold">
            Reserva Confirmada • Lote 01
          </span>
                    <h1 className="text-5xl md:text-7xl font-serif italic text-white leading-tight">
                        O Silêncio agora é seu.
                    </h1>
                </header>

                <div className="space-y-6">
                    <p className="text-xl text-neutral-200 font-light italic">
                        Obrigado por escolher a Alchymia.
                    </p>

                    <div className="h-[1px] w-12 bg-[#D4AF37] mx-auto opacity-50" />

                    <p className="text-neutral-400 max-w-md mx-auto font-light leading-relaxed text-sm md:text-base">
                        Você acaba de garantir uma das **50 unidades numeradas** do Silentivm.
                        Como cada frasco passa por um processo artesanal de maturação, sua obra está sendo preparada com o rigor que a perfumaria de nicho exige.
                    </p>

                    <div className="bg-white/5 border border-white/10 p-6 backdrop-blur-md rounded-sm">
                        <p className="text-white text-xs uppercase tracking-widest mb-2">Próximos Passos</p>
                        <p className="text-neutral-400 text-xs leading-relaxed">
                            Enviamos um recibo detalhado para o seu e-mail. <br/>
                            Assim que a maceração for concluída e o envio realizado, <br/>
                            você receberá seu **código de rastreamento exclusivo**.
                        </p>
                    </div>
                </div>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] border border-[#D4AF37]/30 px-8 py-4 hover:bg-[#D4AF37] hover:text-black transition-all duration-500 inline-block"
                    >
                        Voltar à Galeria
                    </Link>
                </div>
            </div>

            {/* DETALHE ESTÉTICO - Número do Lote */}
            <div className="absolute bottom-10 right-10 opacity-20 hidden md:block">
                <span className="text-white font-serif text-8xl">01</span>
            </div>
        </main>
    );
}