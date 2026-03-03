"use client";
import { motion } from 'framer-motion';

const PYRAMID_DATA = [
  {
    label: "Top Notes",
    title: "Abertura",
    description: "O despertar imediato. Notas voláteis que introduzem o mistério.",
    ingredients: ["Bergamota Italiana", "Pimenta Preta", "Zimbro"]
  },
  {
    label: "Heart Notes",
    title: "O Coração",
    description: "A alma da fragrância. Onde a alquimia se estabiliza e pulsa.",
    ingredients: ["Íris de Florença", "Couro Nobre", "Folhas de Violeta"]
  },
  {
    label: "Base Notes",
    title: "A Alma",
    description: "A rastro eterno. Profundidade que permanece na pele e na memória.",
    ingredients: ["Âmbar Cinza", "Vetiver do Haiti", "Oud de Laos"]
  }
];

export const ScentPyramid = () => {
  return (
    <section className="py-24 md:py-40 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        
        {/* TÍTULO DA SEÇÃO */}
        <div className="text-center mb-20 space-y-4">
          <h3 className="font-serif text-3xl md:text-5xl tracking-widest text-white">
            A Anatomia do <span className="text-gold italic">Silêncio</span>
          </h3>
          <div className="h-[1px] w-12 bg-gold/50 mx-auto" />
        </div>

        {/* CONTAINER DA PIRÂMIDE */}
        <div className="space-y-12">
          {PYRAMID_DATA.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group border-b border-white/5 pb-12 last:border-none flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center"
            >
              {/* LABEL INGLÊS (TÉCNICO) */}
              <div className="w-full md:w-32">
                <span className="text-[10px] uppercase tracking-[0.4em] text-gold/60 group-hover:text-gold transition-colors">
                  {item.label}
                </span>
              </div>

              {/* CONTEÚDO PORTUGUÊS (STORYTELLING) */}
              <div className="flex-1 space-y-2">
                <h4 className="font-serif text-2xl tracking-wide">{item.title}</h4>
                <p className="text-white/40 text-xs font-light tracking-wide max-w-sm">
                  {item.description}
                </p>
              </div>

              {/* INGREDIENTES */}
              <div className="w-full md:w-auto text-right">
                <p className="text-[11px] text-white/70 tracking-[0.2em] font-light leading-loose uppercase">
                  {item.ingredients.join(" • ")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};