import { useEffect, useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-bg/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-[8vw] py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-white font-display font-bold text-lg">R</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-white text-lg leading-tight">
              REBORN AI
            </span>
            <span className="font-mono-label text-[10px] text-text-secondary">
              PACK DIGITAL 360º
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('solution')}
            className="text-sm text-text-secondary hover:text-white transition-colors"
          >
            O que inclui
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-sm text-text-secondary hover:text-white transition-colors"
          >
            Comparativo
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-sm text-text-secondary hover:text-white transition-colors"
          >
            Dúvidas
          </button>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:968677320"
            className="btn-primary text-sm py-2.5 px-4"
          >
            <Phone className="w-4 h-4" />
            <span>Pedir contacto</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-bg/95 backdrop-blur-xl border-t border-white/5 px-6 py-4">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('solution')}
              className="text-left text-text-secondary hover:text-white transition-colors py-2"
            >
              O que inclui
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left text-text-secondary hover:text-white transition-colors py-2"
            >
              Comparativo
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left text-text-secondary hover:text-white transition-colors py-2"
            >
              Dúvidas
            </button>
            <a
              href="tel:968677320"
              className="btn-primary text-sm py-2.5 px-4 mt-2"
            >
              <Phone className="w-4 h-4" />
              <span>Pedir contacto</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
