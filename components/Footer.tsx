"use client";
import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-16">
        
        {/* LOGO E SELO */}
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="font-serif text-3xl tracking-[0.5em] text-gold uppercase">
            Alchymia
          </div>
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-gold/30" />
            <span className="text-[9px] uppercase tracking-[0.4em] text-gold/60 font-light italic">
              Handcrafted in Brazil
            </span>
            <div className="h-[1px] w-8 bg-gold/30" />
          </div>
        </div>

        {/* LINKS SOCIAIS (FAKES) */}
        <nav className="flex flex-wrap justify-center gap-8 md:gap-16">
          {['Instagram', 'Pinterest', 'X / Twitter'].map((social) => (
            <a 
              key={social}
              href="#" 
              className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-gold transition-colors duration-500"
            >
              {social}
            </a>
          ))}
        </nav>

        {/* DIVISOR SUTIL */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* LEGAL & COPYRIGHT */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
          <div className="flex gap-6 text-[8px] uppercase tracking-widest font-light">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          
          <p className="text-[8px] uppercase tracking-[0.3em]">
            © {currentYear} Maison Alchymia. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};