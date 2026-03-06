import { SITE_CONTENT } from '@/data/content'
import { ScentPyramid } from '@/components/ScentPyramid';
import { AboutSection } from '@/components/AboutSection';
import { WaitlistForm } from '@/components/WaitlistForm';
import { HeroImage } from '@/components/HeroImage';
import { Footer } from '@/components/Footer';

export default function Home() {
    return (
        <main className="relative min-h-screen bg-obsidian">

            {/* HEADER
          Alteração: "Join Waitlist" -> "Prioridade Lote 01" (Mais direto e urgente)
      */}
            <header className="fixed top-0 left-0 w-full h-24 p-6 md:px-10 flex justify-between items-center z-50 backdrop-blur-sm border-b border-white/5">
                <div className="font-serif text-2xl tracking-[0.4em] text-gold cursor-pointer">
                    {SITE_CONTENT.brand}
                </div>
                <a href="#waitlist" className="text-[10px] uppercase tracking-[0.3em] border border-gold/30 text-gold px-6 py-2 hover:bg-gold hover:text-black transition-all duration-500">
                    Prioridade Lote 01
                </a>
            </header>

            {/* HERO SECTION */}
            <section className="relative mt-24 h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center px-6 overflow-hidden">

                {/* STATUS TAG - Elemento de autoridade técnica e "em tempo real" */}
                <div className="relative z-20 mb-6 animate-fade-in">
          <span className="px-4 py-1 border border-gold/20 bg-gold/5 text-gold text-[9px] uppercase tracking-[0.4em] rounded-full">
             Status: Em Maceração • 50 Unidades
          </span>
                </div>

                {/* CONTEÚDO
            Alteração: Foco no Lote 01 e na escassez numérica
        */}
                <div className="relative z-20 animate-fade-in pointer-events-none">
                    <h1 className="font-serif text-[clamp(3.5rem,10vw,8rem)] tracking-[0.1em] md:tracking-[0.15em] leading-tight mb-8 drop-shadow-2xl italic">
                        Silentivm <br/>
                        <span className="text-[0.3em] uppercase tracking-[0.6em] not-italic block mt-4 opacity-80">Lote 01</span>
                    </h1>

                    <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto mb-10 font-light leading-relaxed pointer-events-auto">
                        Uma tiragem numerada de apenas 50 frascos. <br/>
                        O acesso será liberado exclusivamente por ordem de reserva.
                    </p>

                    <a href="#waitlist" className="btn-gold pointer-events-auto shadow-[0_0_30px_rgba(212,175,55,0.15)] uppercase text-[11px] tracking-[0.3em]">
                        Solicitar Acesso Prioritário
                    </a>
                </div>

                <HeroImage />

                <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30">
                    <div className="w-[1px] h-12 bg-gold/50" />
                </div>
            </section>

            <AboutSection />

            <ScentPyramid />

            {/* SEÇÃO DE CONVERSÃO
          Dica: No seu componente WaitlistForm, certifique-se de que o título
          também reforce as "50 unidades" e o botão diga "Confirmar minha Reserva"
      */}
            <section id="waitlist" className="py-24 bg-black/50 border-t border-white/5">
                <div className="max-w-2xl mx-auto px-6 text-center space-y-8">
                    <h2 className="font-serif text-3xl md:text-4xl text-white italic">
                        O silêncio é uma raridade.
                    </h2>
                    <p className="text-neutral-400 font-light text-sm md:text-base">
                        Ao confirmar seu e-mail, você garante sua posição na fila do Lote 01.
                        As unidades são limitadas e serão oferecidas primeiro aos membros desta lista.
                    </p>
                    <WaitlistForm />
                    <p className="text-[9px] text-neutral-600 uppercase tracking-widest pt-4">
                        *Inscrição não garante a compra, apenas a prioridade de acesso.
                    </p>
                </div>
            </section>

            <Footer />

        </main>
    )
}