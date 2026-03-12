import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Share2, Bot, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Globe,
    title: 'Website Premium',
    subtitle: 'A sua montra digital',
    value: '250€',
    bullets: [
      'Landing page premium focada em geração de contactos/pedidos.',
      'Copy adaptada ao negócio e público português.',
      'Alojamento otimizado configurado.',
      '1 ronda de atualização mensal (texto, imagens e secções simples).',
    ],
  },
  {
    icon: Share2,
    title: 'Ecossistema Social',
    subtitle: 'Tráfego e autoridade',
    value: '450€',
    bullets: [
      'Planeamento e publicação recorrente em redes chave (ex.: Instagram e Facebook).',
      'Gestão das campanhas de anúncios para gerar tráfego qualificado.',
      'Relatório simples mensal com principais métricas.',
      'Link na bio inteligente (árvore de links).',
    ],
  },
  {
    icon: Bot,
    title: 'Automação com IA',
    subtitle: 'Vendas no automático',
    value: '600€',
    bullets: [
      'Chatbot humanizado treinado com as principais dúvidas do seu negócio.',
      'Atendimento 24h/7 sem interrupções.',
      'Integração com a landing page e/ou canal de mensagens.',
      'Captação automática de leads para follow-up.',
    ],
  },
];

export default function Solution() {
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

      const cardElements = cards.querySelectorAll('.feature-card');
      const valueLabels = cards.querySelectorAll('.value-label');

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          headline,
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          cardElements,
          { y: '60vh', scale: 0.92, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, stagger: 0.08, ease: 'none' },
          0.1
        )
        .fromTo(
          valueLabels,
          { x: '6vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.06, ease: 'none' },
          0.2
        );

      // SETTLE (30% - 70%) - no animation

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          headline,
          { x: 0, opacity: 1 },
          { x: '-12vw', opacity: 0.25, ease: 'power2.in' },
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
      id="solution"
      className="section-pinned gradient-bg flex flex-col justify-center"
      style={{ zIndex: 40 }}
    >
      <div className="w-full px-6 lg:px-[8vw] pt-24">
        {/* Headline */}
        <div ref={headlineRef} className="mb-10 lg:mb-14 max-w-2xl">
          <span className="font-mono-label text-primary mb-4 block">
            A SOLUÇÃO
          </span>
          <h2 className="font-display font-bold text-display-2 text-white mb-4">
            Tudo no mesmo pack
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            O <strong className="text-white">Pack Digital 360º</strong>. Um único plano mensal 
            que junta site, redes sociais, tráfego e chatbot com IA numa operação simples, 
            desenhada para empresas em Portugal.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card glass-card p-6 lg:p-8 relative"
            >
              {/* Value Label */}
              <div className="value-label absolute top-4 right-4 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="text-xs text-text-secondary">
                  Valor em separado:{' '}
                  <span className="text-primary font-semibold">
                    {feature.value}
                  </span>
                </span>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <p className="font-mono-label text-primary text-[10px] mb-2">
                {feature.subtitle.toUpperCase()}
              </p>
              <h3 className="font-display font-bold text-xl text-white mb-4">
                {feature.title}
              </h3>

              {/* Bullets */}
              <ul className="space-y-3">
                {feature.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm leading-relaxed">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
