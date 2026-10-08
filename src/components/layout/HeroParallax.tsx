import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

export default function HeroParallax() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="inicio" ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-[#00f0ff]/15 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-[#8b5cf6]/15 blur-[120px]" />
      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-28 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 px-4 py-2 text-sm text-[#00f0ff]">
          <Sparkles className="h-4 w-4" /> RTX 5070 já disponível
        </div>
        <h1 className="font-heading text-5xl font-bold leading-tight text-slate-100 sm:text-6xl lg:text-7xl">
          Potência <span className="bg-gradient-to-r from-[#00f0ff] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">Gamer</span><br />no seu Setup
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Placas de vídeo, processadores, gabinetes RGB e tudo para seu PC dos sonhos. Até 12x sem juros.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a href="#produtos" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00f0ff] to-[#8b5cf6] px-8 py-4 font-semibold text-white transition hover:scale-105 hover:shadow-xl hover:shadow-[#00f0ff]/30">
            Comprar Agora <ArrowRight className="h-5 w-5" />
          </a>
          <a href="#produtos" className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-slate-100 transition hover:border-[#00f0ff]/50 hover:text-[#00f0ff]">
            Ver Ofertas
          </a>
        </div>
        <div className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-6">
          {[['+500', 'Produtos'], ['+10K', 'Clientes'], ['4.9', 'Avaliação']].map(([v, l]) => (
            <div key={l}><p className="text-2xl font-bold text-[#00f0ff] sm:text-3xl">{v}</p><p className="text-sm text-slate-400">{l}</p></div>
          ))}
        </div>
      </motion.div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-slate-500"><ChevronDown className="h-6 w-6" /></div>
    </section>
  );
}
