import { useState } from 'react';
import { CreditCard, Gamepad2, Globe, MessageCircle, Play, Send, Share2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <footer id="contato" className="border-t border-white/10 bg-[#06060a] pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#8b5cf6]">
                <Gamepad2 className="h-5 w-5 text-white" />
              </span>
              <span className="font-heading font-bold text-slate-100">WEB <span className="text-[#00f0ff]">Parallax</span> <span className="text-[#8b5cf6]">GAMERS</span></span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">Hardware de alta performance com curadoria gamer, preço justo e suporte de quem joga de verdade.</p>
            <div className="mt-4 flex gap-2">
              {[Globe, MessageCircle, Play, Share2].map((Icon, i) => (
                <a key={i} href="#" aria-label="Rede social" className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-400 transition hover:border-[#00f0ff]/50 hover:text-[#00f0ff]">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-100">Categorias</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {['Placas de Vídeo', 'Processadores', 'Gabinetes RGB', 'Memórias RAM', 'SSDs NVMe', 'Kits Gamers'].map((c) => (
                <li key={c}><a href="#produtos" className="transition hover:text-[#00f0ff]">{c}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-100">Ajuda</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {['Central de ajuda', 'Trocas e devoluções', 'Garantia', 'Frete e prazos', 'Fale conosco'].map((c) => (
                <li key={c}><a href="#" className="transition hover:text-[#00f0ff]">{c}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-100">Ofertas no e-mail</h4>
            <p className="mt-4 text-sm text-slate-400">10% OFF na primeira compra via Pix.</p>
            {sent ? (
              <p className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">Inscrito! Fique de olho no e-mail.</p>
            ) : (
              <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSent(true); }}>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com"
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-[#00f0ff]/60" />
                <button aria-label="Assinar" className="rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#8b5cf6] p-2.5 text-white transition hover:shadow-lg hover:shadow-[#00f0ff]/25">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
            <p className="mt-4 flex items-center gap-2 text-xs text-slate-500"><CreditCard className="h-4 w-4" /> Visa • Master • Pix • Boleto</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 WEB Paralax GAMERS. Todos os direitos reservados.</p>
          <div className="flex gap-5"><a href="#" className="hover:text-[#00f0ff]">Privacidade</a><a href="#" className="hover:text-[#00f0ff]">Termos</a></div>
        </div>
      </div>
    </footer>
  );
}
