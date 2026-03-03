"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

export const AlchemistImage = () => (
    <motion.div 
        initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "circOut" }}
        className="relative aspect-[4/5] overflow-hidden group"
    >
        <Image 
        src="/images/alchemist.png"
        alt="O processo alquímico da Maison Alchymia"
        fill
        className="object-cover grayscale transition-transform duration-1000 group-hover:scale-105"
        sizes="(max-w-768px) 100vw, 50vw"
        />
        {/* Overlay de Vinheta para manter o luxo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
    </motion.div>
);

