import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MessageSquare, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: 'O que inclui', href: '#solution' },
  { label: 'Preços', href: '#pricing' },
  { label: 'Perguntas Frequentes', href: '#faq' },
  { label: 'Política de Privacidade', href: '#' },
  { label: 'Termos e Condições', href: '#' },
  { label: 'Livro de Reclamações', href: 'https://www.livroreclamacoes.pt', external: true },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.footer-col'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      ref={sectionRef}
      className="w-full gradient-bg border-t border-white/5 py-16 lg:py-24"
      style={{ zIndex: 110 }}
    >
      <div className="px-6 lg:px-[8vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          {/* Left Column - Brand & Contact */}
          <div className="footer-col space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">R</span>
              </div>
              <div>
                <span className="font-display font-bold text-white text-xl">
                  REBORN AI
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-text-secondary max-w-md leading-relaxed">
              Soluções de automação e web design para modernizar empresas em Portugal.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <a
                href="tel:968677320"
                className="flex items-center gap-3 text-white hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span>968 677 320</span>
              </a>

              <a
                href="https://wa.me/351968677320?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Pack%20360."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span>WhatsApp Direto</span>
              </a>

              <a
                href="mailto:contacto@rebornai.pt"
                className="flex items-center gap-3 text-white hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <span>contacto@rebornai.pt</span>
              </a>
            </div>
          </div>

          {/* Right Column - Links */}
          <div className="footer-col">
            <h4 className="font-display font-semibold text-white mb-6">
              Links Úteis
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {footerLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-left"
                >
                  {link.external && <ExternalLink className="w-3 h-3" />}
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            © 2025 Reborn AI. Todos os direitos reservados.
          </p>
          <p className="text-text-secondary/60 text-xs">
            NIF: 000000000 | Portugal
          </p>
        </div>
      </div>
    </footer>
  );
}
