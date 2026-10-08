import { motion } from 'framer-motion';
import { CreditCard, Headset, ShieldCheck, Truck } from 'lucide-react';

const items = [
  { icon: Truck, title: 'Frete Grátis', desc: 'Em pedidos acima de R$ 500 para todo o Brasil.', color: 'from-[#00f0ff] to-cyan-500' },
  { icon: ShieldCheck, title: 'Garantia Estendida', desc: 'Até 2 anos de garantia em todos os hardwares.', color: 'from-[#8b5cf6] to-violet-500' },
  { icon: Headset, title: 'Suporte Gamer', desc: 'Especialistas reais, 7 dias por semana.', color: 'from-[#ec4899] to-pink-500' },
  { icon: CreditCard, title: 'Até 12x sem Juros', desc: 'Pix com 10% off e cartões sem juros.', color: 'from-emerald-400 to-green-600' },
];

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="bg-white/[0.02] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#8b5cf6]">Diferenciais</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-slate-100 sm:text-4xl">Por que a <span className="text-[#00f0ff]">Parallax</span>?</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-[#12121a] p-6 text-center transition hover:-translate-y-1 hover:border-[#00f0ff]/40">
              <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${b.color}`}>
                <b.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-semibold text-slate-100">{b.title}</h3>
              <p className="mt-1.5 text-sm text-slate-400">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
