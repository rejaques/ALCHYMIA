"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { joinWaitlistAction } from '@/app/actions';

export const WaitlistForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setStatus('loading');

  const formData = new FormData(e.currentTarget);
  const result = await joinWaitlistAction(formData);

  if (result.success) {
    setStatus('success');
  } else {
    alert(result.error);
    setStatus('idle');
  }
};

  return (
    <section id="waitlist" className="py-24 px-6 bg-obsidian flex flex-col items-center border-t border-white/5">
      <div className="max-w-md w-full text-center relative min-h-[400px] flex flex-col justify-center">
        
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div
              key="form-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.5em] text-gold/60">
                  Exclusive Access
                </span>
                <h3 className="font-serif text-3xl md:text-4xl tracking-wide">
                  Entre na Lista de Espera
                </h3>
                <p className="text-white/40 text-xs font-light tracking-widest">
                  Seja notificado para o lançamento do Lote 01.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group relative">
                  <input 
                    required
                    type="text" 
                    name = "name"
                    placeholder="SEU NOME"
                    className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] tracking-[0.3em] outline-none focus:border-gold transition-colors uppercase placeholder:text-white/20"
                  />
                </div>
                
                <div className="group relative">
                  <input 
                    required
                    type="email" 
                    name = "email"
                    placeholder="E-MAIL"
                    className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] tracking-[0.3em] outline-none focus:border-gold transition-colors uppercase placeholder:text-white/20"
                  />
                </div>

                <div className="pt-8">
                  <button 
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-gold text-black text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white transition-all duration-500 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Processando...' : 'Solicitar Convite'}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 py-10"
            >
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center">
                  <motion.span 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="text-gold text-xl"
                  >
                    ✓
                  </motion.span>
                </div>
              </div>
              <h3 className="font-serif text-3xl tracking-wide text-white">Bem-vindo à Alchymia</h3>
              <p className="text-white/50 text-xs font-light tracking-[0.2em] leading-relaxed max-w-[280px] mx-auto">
                Sua solicitação foi registrada. Um convite será enviado para o seu e-mail em breve.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-[9px] uppercase tracking-[0.4em] text-gold/60 hover:text-gold transition-colors pt-4"
              >
                Voltar
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};