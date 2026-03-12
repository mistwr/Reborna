import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, Check, Zap, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftContent = leftContentRef.current;
    const card = cardRef.current;
    const glow = glowRef.current;

    if (!section || !leftContent || !card || !glow) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ delay: 0.2 });

      loadTl
        .fromTo(glow, { opacity: 0 }, { opacity: 0.7, duration: 0.8 })
        .fromTo(
          leftContent.querySelectorAll('.hero-eyebrow, .hero-headline, .hero-subheadline, .hero-price, .hero-ctas'),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          card,
          { x: '10vw', rotateY: 8, opacity: 0 },
          { x: 0, rotateY: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.6'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible when scrolling back
            gsap.set([leftContent, card], { x: 0, opacity: 1 });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(
          leftContent,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          card,
          { x: 0, rotateY: 0, opacity: 1 },
          { x: '18vw', rotateY: -6, opacity: 0.25, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToChatbot = () => {
    const element = document.getElementById('chatbot');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      style={{ zIndex: 10 }}
    >
      {/* Glow Orb */}
      <div
        ref={glowRef}
        className="absolute right-[-10vw] top-[18vh] w-[55vw] h-[55vw] glow-orb opacity-0 animate-pulse-glow"
      />

      <div className="w-full px-6 lg:px-[8vw] pt-24 pb-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Content */}
        <div
          ref={leftContentRef}
          className="w-full lg:w-[44vw] flex flex-col gap-5"
        >
          <span className="hero-eyebrow font-mono-label text-primary">
            MARÇO: VAGAS LIMITADAS
          </span>
          
          <h1 className="hero-headline font-display font-bold text-display-1 text-white">
            Presença Digital{' '}
            <span className="text-gradient">De Elite</span>
          </h1>
          
          <p className="hero-subheadline text-lg text-text-secondary leading-relaxed max-w-xl">
            Deixe de perder clientes para a concorrência. Gerimos as suas{' '}
            <strong className="text-white">redes sociais, site e atendimento automático num só lugar</strong>. 
            Uma estrutura pronta a gerar pedidos diários.
          </p>
          
          <p className="hero-price text-lg">
            Tecnologia de ponta por{' '}
            <strong className="text-white text-xl">299€/mês</strong>, sem fidelização.
          </p>
          
          <div className="hero-ctas flex flex-wrap gap-4 mt-2">
            <button onClick={scrollToPricing} className="btn-primary">
              <span>Garantir o Meu Pack</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={scrollToChatbot} className="btn-secondary">
              <span>Testar a Reborn Agora</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Offer Card */}
        <div
          ref={cardRef}
          className="w-full lg:w-[34vw] min-w-[320px] glass-card p-6 lg:p-8"
        >
          {/* Limited Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono-label text-[10px] text-red-400">
              OPORTUNIDADES LIMITADAS
            </span>
          </div>

          <h3 className="font-display font-bold text-2xl lg:text-3xl text-white mb-1">
            Pack Digital 360º
          </h3>
          <p className="font-mono-label text-primary text-xs mb-6">
            ECOSSISTEMA TUDO-EM-UM
          </p>

          {/* Features List */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <div>
                <p className="text-white font-medium">Site Premium de Alta Conversão</p>
                <p className="text-text-secondary text-sm">(Landing Page)</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <div>
                <p className="text-white font-medium">Gestão Pro de Redes Sociais</p>
                <p className="text-text-secondary text-sm">+ Tráfego</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <div>
                <p className="text-white font-medium">IA Vendedora 24h</p>
                <p className="text-text-secondary text-sm">(Chatbot Humanizado)</p>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="border-t border-white/10 pt-6 mb-6">
            <p className="font-mono-label text-text-secondary text-xs mb-2">
              INVESTIMENTO TOTAL
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-text-secondary text-2xl">€</span>
              <span className="font-display font-bold text-5xl lg:text-6xl text-white">
                299
              </span>
              <span className="text-text-secondary text-2xl">,99</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs text-text-secondary">Entrega Rápida</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Lock className="w-4 h-4 text-green-400" />
              <span className="text-xs text-text-secondary">Sem Fidelização</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
