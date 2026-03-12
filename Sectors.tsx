import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Briefcase, Scale, Heart, Home, HardHat, Dumbbell, Users, GraduationCap, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sectors = [
  { icon: Briefcase, label: 'Serviços' },
  { icon: Scale, label: 'Advocacia' },
  { icon: Heart, label: 'Clínicas' },
  { icon: Home, label: 'Imobiliárias' },
  { icon: HardHat, label: 'Construção' },
  { icon: Dumbbell, label: 'Ginásios' },
  { icon: Users, label: 'Consultoria' },
  { icon: GraduationCap, label: 'Educação' },
  { icon: Building2, label: 'PMEs' },
];

export default function Sectors() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftContent = leftContentRef.current;
    const grid = gridRef.current;

    if (!section || !leftContent || !grid) return;

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

      const tiles = grid.querySelectorAll('.sector-tile');
      const cta = leftContent.querySelector('.cta-button');

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          leftContent.querySelector('h2'),
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          leftContent.querySelector('p'),
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          cta,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12
        )
        .fromTo(
          tiles,
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.06, ease: 'none' },
          0.1
        );

      // SETTLE (30% - 70%) - no animation

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          leftContent,
          { y: 0, opacity: 1 },
          { y: '-12vh', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          grid,
          { y: 0, opacity: 1 },
          { y: '12vh', opacity: 0.25, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned gradient-bg flex items-center justify-center"
      style={{ zIndex: 80 }}
    >
      <div className="w-full px-6 lg:px-[8vw] pt-24 pb-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Content */}
        <div
          ref={leftContentRef}
          className="w-full lg:w-[40vw] flex flex-col gap-5"
        >
          <h2 className="font-display font-bold text-display-2 text-white">
            Pronto para subir de nível?
          </h2>
          
          <p className="text-lg text-text-secondary leading-relaxed">
            Não deixe o seu negócio parecer amador por mais um dia. A sua nova 
            estrutura digital está a um clique.
          </p>
          
          <div className="cta-button mt-4">
            <a
              href="https://wa.me/351968677320?text=Olá!%20Quero%20começar%20com%20o%20Pack%20360º."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg py-4 px-8"
            >
              <span>Começar por 299€/mês</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-text-secondary text-sm mt-3">
              Compra segura • Sem fidelização
            </p>
          </div>
        </div>

        {/* Right Grid */}
        <div
          ref={gridRef}
          className="w-full lg:w-[40vw] grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="sector-tile glass-card-sm p-4 flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-colors cursor-default"
            >
              <sector.icon className="w-6 h-6 text-primary" />
              <span className="text-white text-sm font-medium text-center">
                {sector.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
