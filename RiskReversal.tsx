import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Unlock, HeadphonesIcon, Zap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trustPoints = [
  {
    icon: Unlock,
    title: 'Sem Fidelização',
    description: 'Não exigimos contratos de 12 ou 24 meses. Mantemos os clientes pelos resultados, não por obrigação.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Suporte Real',
    description: 'Nada de tickets infinitos. Terá contacto direto com a nossa equipa técnica em Portugal.',
  },
  {
    icon: Zap,
    title: 'Rapidez',
    description: 'Esqueça os "3 meses para fazer um site". A nossa estrutura permite lançamentos em dias.',
  },
];

export default function RiskReversal() {
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

  return (
    <section
      ref={sectionRef}
      className="section-pinned gradient-bg flex items-center justify-center"
      style={{ zIndex: 100 }}
    >
      <div className="w-full px-6 lg:px-[8vw] pt-24 pb-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Content */}
        <div
          ref={leftContentRef}
          className="w-full lg:w-[40vw] flex flex-col gap-6"
        >
          <h2 className="font-display font-bold text-display-2 text-white">
            O Risco é Zero
          </h2>
          
          <p className="text-lg text-text-secondary leading-relaxed">
            Sabemos que o mercado está cheio de promessas falsas. Por isso, 
            jogamos limpo. Não prendemos ninguém com contratos abusivos. Se 
            a sua empresa não estiver a ter resultados, pode cancelar a qualquer 
            momento.
          </p>
          
          {/* Trust Points */}
          <div className="space-y-4 mt-4">
            {trustPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">{point.title}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right CTA Card */}
        <div
          ref={rightCardRef}
          className="w-full lg:w-[38vw] min-w-[320px] glass-card p-8"
        >
          <h3 className="font-display font-bold text-2xl text-white mb-4">
            Aproveite e garanta esta oportunidade
          </h3>
          
          <p className="text-text-secondary leading-relaxed mb-8">
            Garantimos qualidade e acompanhamento personalizado, por isso 
            limitamos o número de implementações por mês.
          </p>
          
          <a
            href="https://wa.me/351968677320?text=Olá!%20Quero%20garantir%20o%20meu%20lugar%20no%20Pack%20360º."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full text-lg py-4"
          >
            <span>Garantir o meu lugar</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
