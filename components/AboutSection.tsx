"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

export const AboutSection = () => {
  return (
    <section className="relative py-24 md:py-40 px-6 bg-obsidian overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        
        {/* COLUNA 1: IMAGEM (REVEAL) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 shadow-2xl"
        >
          <Image 
            src="/images/alchemist.png" // Certifique-se do nome correto do arquivo
            alt="The Alchemist Process"
            fill
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA6O9LjgAAAABJRU5ErkJggg=="
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 duration-700"
            sizes="(max-w-768px) 100vw, 50vw"
          />
          {/* Overlay sutil para manter o clima sombrio */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* COLUNA 2: TEXTO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-light">
              The Philosophy
            </span>
            <h2 className="font-serif text-4xl md:text-6xl tracking-wide leading-tight text-white">
              Our Gilded <br /> <span className="italic">Shadow</span>
            </h2>
          </div>

          <p className="text-white/60 font-light leading-relaxed tracking-wide text-sm md:text-base max-w-md">
            Na Alchymia, não extraímos apenas essências; capturamos fragmentos de tempo. 
            Cada frasco de <span className="text-gold/80 italic">Silentivm</span> é o resultado de meses de maceração em sombras absolutas.
          </p>

          <p className="text-white/60 font-light leading-relaxed tracking-wide text-sm md:text-base max-w-md">
            Nossa abordagem é purista. Sem químicos sintéticos agressivos, apenas a força bruta da natureza refinada pelo fogo e pelo espírito.
          </p>

          <div className="pt-6">
            <div className="h-[1px] w-24 bg-gold/40 mb-4" />
            <p className="text-[9px] uppercase tracking-[0.3em] text-gold/60">
              Handcrafted in small batches • Lot 01
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};