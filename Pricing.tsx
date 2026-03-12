import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe, Share2, Bot } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const marketItems = [
  { icon: Globe, label: 'Landing Page (Website) + Atualização Mensal', price: '250€' },
  { icon: Share2, label: 'Gestão de redes sociais + Tráfego', price: '450€' },
  { icon: Bot, label: 'Elaboração de Chatbot Personalizado', price: '600€' },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftStackRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const vsBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftStack = leftStackRef.current;
    const rightCard = rightCardRef.current;
    const vsBadge = vsBadgeRef.current;

    if (!section || !leftStack || !rightCard || !vsBadge) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      const leftCards = leftStack.querySelectorAll('.market-card');
      const priceChars = rightCard.querySelectorAll('.price-char');

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          leftCards,
          { x: '-60vw', rotateY: 12, opacity: 0 },
          { x: 0, rotateY: 0, opacity: 1, stagger: 0.08, ease: 'none' },
          0
        )
        .fromTo(
          rightCard,
          { x: '60vw', rotateY: -12, opacity: 0 },
          { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          vsBadge,
          { scale: 0.2, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'back.out(1.8)' },
          0.18
        )
        .fromTo(
          priceChars,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.22
        );

      // SETTLE (30% - 70%) - no animation

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          leftStack,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          rightCard,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          vsBadge,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.85
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="section-pinned gradient-bg flex items-center justify-center"
      style={{ zIndex: 50 }}
    >
      <div className="w-full px-6 lg:px-[8vw] pt-24 pb-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Side - Market Stack */}
        <div ref={leftStackRef} className="w-full lg:w-[40vw] flex flex-col gap-4">
          <div className="mb-4">
            <span className="font-mono-label text-primary mb-4 block">
              COMPARATIVO
            </span>
            <h2 className="font-display font-bold text-display-2 text-white mb-4">
              Faça as contas.
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Contratar site, redes sociais, tráfego e chatbot em fornecedores 
              separados pode facilmente ultrapassar os 1.300€/mês, sem alojamento 
              nem suporte incluídos. Com o Pack Digital 360º tem tudo concentrado 
              por 299,99€/mês.
            </p>
          </div>

          {/* Market Cards */}
          <div className="space-y-3">
            {marketItems.map((item, index) => (
              <div
                key={index}
                className="market-card glass-card-sm p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-text-secondary" />
                  </div>
                  <span className="text-white text-sm">{item.label}</span>
                </div>
                <span className="text-text-secondary font-mono">{item.price}</span>
              </div>
            ))}
          </div>

          {/* Market Total */}
          <div className="glass-card-sm p-4 border-l-2 border-red-400/50">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Total de mercado:</span>
              <span className="text-red-400 font-display font-bold text-xl">
                1.300€ +
              </span>
            </div>
          </div>
        </div>

        {/* VS Badge */}
        <div
          ref={vsBadgeRef}
          className="hidden lg:flex w-16 h-16 rounded-full bg-primary items-center justify-center shadow-glow z-10"
        >
          <span className="font-display font-bold text-white text-lg">VS</span>
        </div>

        {/* Right Side - Offer Card */}
        <div
          ref={rightCardRef}
          className="w-full lg:w-[40vw] min-w-[320px] glass-card p-8 relative"
        >
          <div className="text-center mb-6">
            <p className="font-mono-label text-primary text-xs mb-2">
              OFERTA REBORN AI
            </p>
          </div>

          {/* Big Price */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-text-secondary text-3xl">€</span>
              <span className="font-display font-bold text-7xl lg:text-8xl text-white price-char">
                2
              </span>
              <span className="font-display font-bold text-7xl lg:text-8xl text-white price-char">
                9
              </span>
              <span className="font-display font-bold text-7xl lg:text-8xl text-white price-char">
                9
              </span>
              <span className="text-text-secondary text-3xl">,99</span>
            </div>
            <p className="text-text-secondary text-sm mt-2">
              Pagamento mensal • Sem fidelização
            </p>
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/351968677320?text=Olá!%20Quero%20ativar%20o%20meu%20Pack%20360º."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full text-lg py-4"
          >
            <span>ATIVAR MEU PACK 360º</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          {/* Disclaimer */}
          <p className="text-center text-text-secondary/60 text-xs mt-4">
            O IVA será aplicado à taxa legal em vigor.
          </p>
        </div>
      </div>
    </section>
  );
}
