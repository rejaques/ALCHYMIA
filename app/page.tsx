import { SITE_CONTENT } from '@/data/content'
import { ScentPyramid } from '@/components/ScentPyramid';
import { AboutSection } from '@/components/AboutSection';
import { WaitlistForm } from '@/components/WaitlistForm';
import { HeroImage } from '@/components/HeroImage';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-obsidian">
      
      {/* HEADER - Definimos h-24 (96px) para ter controle do espaço */}
      <header className="fixed top-0 left-0 w-full h-24 p-6 md:px-10 flex justify-between items-center z-50 backdrop-blur-sm border-b border-white/5">
        <div className="font-serif text-2xl tracking-[0.4em] text-gold cursor-pointer">
          {SITE_CONTENT.brand}
        </div>
        <a href="#waitlist" className="text-[10px] uppercase tracking-widest border border-white/10 px-6 py-2 hover:border-gold transition-all">
          Join Waitlist
        </a>
      </header>

      {/* HERO SECTION 
          - mt-24: Empurra a seção para começar exatamente onde o header termina.
          - h-[calc(100vh-6rem)]: A altura é 100vh menos os 6rem (96px) do header.
      */}
      <section className="relative mt-24 h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* CONTEÚDO (Texto e Botão) */}
        <div className="relative z-20 animate-fade-in pointer-events-none">
            <h1 className="font-serif text-[clamp(3.5rem,12vw,10rem)] tracking-[0.1em] md:tracking-[0.2em] leading-none mb-12 drop-shadow-2xl">
              {SITE_CONTENT.hero.title}
            </h1>
            <a href="#waitlist" className="btn-gold pointer-events-auto shadow-2xl">
              {SITE_CONTENT.hero.cta}
            </a>
        </div>

        {/* IMAGEM DO FRASCO - Agora ela vai respeitar o limite da section pai */}
        <HeroImage />

        {/* INDICADOR DE SCROLL */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30">
          <div className="w-[1px] h-12 bg-white/50" />
        </div>
      </section>

      <AboutSection />
      
      <ScentPyramid />

      <WaitlistForm />

      {/* FOOTER */}
      <Footer />

    </main>
  )
}