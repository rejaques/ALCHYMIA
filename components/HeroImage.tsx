"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

export const HeroImage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.3 }}
    transition={{ duration: 2 }}
    /* Aumentamos um pouco a opacidade para 10% (0.1) para compensar o fato 
       de que no PC ela estará menos esticada. 
    */
    className="absolute inset-0 z-0 opacity-10 pointer-events-none"
  >
    <Image 
      src="/images/hero-silentivm3.png"
      alt="Background Alchymia"
      fill
      priority
      quality={90}
      /* - object-cover: Usado em telas pequenas (padrão mobile).
         - md:object-contain: No PC (telas médias em diante), ele mostra a imagem inteira.
         - Como o fundo da imagem e da section são pretos, o efeito visual é de preenchimento total.
      */
      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
      className="object-cover md:object-contain object-center"
    />
    
    {/* TOQUE DE DESIGNER: Adicionamos um gradiente radial por cima para 
        garantir que as bordas da imagem sumam completamente no fundo do site.
    */}

  </motion.div>
);