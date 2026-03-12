import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wallet, Clock, Unlink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: Wallet,
    title: 'Custos ocultos',
    description:
      'Agências cobram 1.500€+ pelo site, depois cobram pela gestão das redes e mais ainda pelo software. O lucro desaparece antes de começar.',
    accentColor: 'accent-line-blue',
  },
  {
    icon: Clock,
    title: 'Lentidão extrema',
    description:
      'Prazos de "45 dias úteis". No mundo digital isto é uma eternidade. Precisa de vender hoje, não no próximo trimestre.',
    accentColor: 'accent-line-light',
  },
  {
    icon: Unlink,
    title: 'Peças soltas',
    description:
      'O site não fala com o Instagram. O Instagram não encaminha para o WhatsApp. O cliente perde-se e a venda perde-se também.',
    accentColor: 'accent-line-gray',
  },
];

export default function Problems() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;

    if (!section || !headline || !cards) return;

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

      const cardElements = cards.querySelectorAll('.problem-card');

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          headline,
          { y: '-40vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          cardElements,
          { y: '60vh', rotateX: 12, opacity: 0 },
          { y: 0, rotateX: 0, opacity: 1, stagger: 0.08, ease: 'none' },
          0.1
        );

      // SETTLE (30% - 70%) - no animation

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          headline,
          { y: 0, opacity: 1 },
          { y: '-12vh', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          cardElements,
          { y: 0, opacity: 1 },
          { y: '18vh', opacity: 0.25, stagger: 0.04, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned gradient-bg flex flex-col justify-center"
      style={{ zIndex: 30 }}
    >
      <div className="w-full px-6 lg:px-[8vw] pt-24">
        {/* Headline */}
        <div ref={headlineRef} className="mb-10 lg:mb-14 max-w-2xl">
          <span className="font-mono-label text-primary mb-4 block">
            PORQUE MUDAR
          </span>
          <h2 className="font-display font-bold text-display-2 text-white mb-4">
            O digital tradicional já não funciona
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            Empresários gastam fortunas em agências lentas ou perdem horas a 
            tentar fazer tudo sozinhos. O resultado? Sites fracos que não vendem.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {problems.map((problem, index) => (
            <div
              key={index}
              className="problem-card glass-card p-6 lg:p-8 relative overflow-hidden animate-float"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              {/* Accent Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 ${problem.accentColor}`}
              />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                <problem.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-white mb-3">
                {problem.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
