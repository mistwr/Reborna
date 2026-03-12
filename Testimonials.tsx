import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    initials: 'AF',
    name: 'André Ferreira',
    role: 'CEO, TechSolutions',
    quote:
      'A qualidade visual que a Reborn AI entregou é impressionante. O meu site parece custar 5.000€. O nosso novo chatbot humanizado já filtrou vários curiosos só esta manhã.',
    avatar: '/avatar-af.png',
  },
  {
    initials: 'ML',
    name: 'Maria Lucas',
    role: 'Clínica de Estética',
    quote:
      'Não percebo nada de computadores. Entregaram tudo pronto. Só tive de colocar o link no Instagram e o telefone começou a tocar.',
    avatar: '/avatar-ml.png',
  },
  {
    initials: 'JP',
    name: 'João Pedro',
    role: 'Stand Automóvel',
    quote:
      'O melhor investimento do ano. Paguei 299€ e recuperei esse valor na primeira semana de vendas com a nova landing page.',
    avatar: '/avatar-jp.png',
  },
];

export default function Testimonials() {
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

      const cardElements = cards.querySelectorAll('.testimonial-card');

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          headline,
          { y: '-30vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          cardElements,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, ease: 'none' },
          0.1
        );

      // SETTLE (30% - 70%) - no animation

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardElements,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.25, stagger: 0.04, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned gradient-bg flex flex-col justify-center"
      style={{ zIndex: 70 }}
    >
      <div className="w-full px-6 lg:px-[8vw] pt-24">
        {/* Headline */}
        <div ref={headlineRef} className="mb-10 lg:mb-14">
          <span className="font-mono-label text-primary mb-4 block">
            RESULTADOS REAIS
          </span>
          <h2 className="font-display font-bold text-display-2 text-white mb-4">
            Quem já automatizou
          </h2>
          <p className="text-lg text-text-secondary max-w-xl">
            Junte-se a outros empresários que já automatizaram o seu atendimento digital.
          </p>

          {/* Rating */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-primary text-primary"
                />
              ))}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-white">
                4,9/5
              </span>
              <span className="text-text-secondary text-sm">(128 avaliações)</span>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card glass-card p-6 lg:p-8"
            >
              {/* Quote */}
              <p className="text-white leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">{testimonial.name}</p>
                  <p className="text-text-secondary text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
