import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Gift, Lock, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PackBase() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftContent = leftContentRef.current;
    const rightCard = rightCardRef.current;

    if (!section || !leftContent || !rightCard) return;

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

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          leftContent,
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          rightCard,
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08
        );

      // SETTLE (30% - 70%) - no animation

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          leftContent,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          rightCard,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned gradient-bg flex items-center justify-center"
      style={{ zIndex: 60 }}
    >
      <div className="w-full px-6 lg:px-[8vw] pt-24 pb-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Content */}
        <div
          ref={leftContentRef}
          className="w-full lg:w-[40vw] flex flex-col gap-5"
        >
          <h2 className="font-display font-bold text-display-2 text-white">
            Se quer começar com o essencial
          </h2>
          
          <p className="text-xl text-white font-medium">
            Comece pelo <span className="text-primary">Pack Base</span> e evolua depois
          </p>
          
          <p className="text-lg text-text-secondary leading-relaxed">
            2 WhatsApps, 4 utilizadores, dashboard, automações essenciais e IA 
            configurada para o seu negócio. <strong className="text-white">Setup grátis</strong> e{' '}
            <strong className="text-white">sem fidelização</strong>. Implementação 
            guiada e suporte incluído.
          </p>
        </div>

        {/* Right Card */}
        <div
          ref={rightCardRef}
          className="w-full lg:w-[38vw] min-w-[320px] glass-card p-8"
        >
          {/* Price */}
          <div className="text-center mb-6">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-text-secondary text-2xl">€</span>
              <span className="font-display font-bold text-6xl text-white">
                29
              </span>
              <span className="text-text-secondary text-xl">/mês</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
              <Gift className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">Setup grátis</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Lock className="w-4 h-4 text-text-secondary" />
              <span className="text-xs text-text-secondary">Sem fidelização</span>
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/351968677320?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Pack%20Base."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full mb-4"
          >
            <span>Ver Pack Base (29€/mês)</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Link to Pack 360 */}
          <button
            onClick={scrollToPricing}
            className="w-full text-center text-primary text-sm hover:underline flex items-center justify-center gap-1"
          >
            <span>Quero o Pack 360º</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
