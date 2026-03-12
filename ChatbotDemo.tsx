import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Send, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const initialMessages = [
  {
    id: 1,
    type: 'bot',
    text: 'Bem-vindo à Reborn AI! Como posso ajudar?',
  },
  {
    id: 2,
    type: 'user',
    text: 'Olá! Ouvi falar do pacote de 299€. O que inclui?',
  },
  {
    id: 3,
    type: 'bot',
    text: 'Olá! Sou a Reborn 👋. Inclui tudo: Site Profissional, Facebook, Instagram e este Chatbot!',
  },
];

export default function ChatbotDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const section = sectionRef.current;
    const leftContent = leftContentRef.current;
    const card = cardRef.current;

    if (!section || !leftContent || !card) return;

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
          card,
          { x: '50vw', rotateY: 10, opacity: 0 },
          { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
          0.05
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
          card,
          { x: 0, rotateY: 0, opacity: 1 },
          { x: '18vw', rotateY: -6, opacity: 0.25, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
    };

    setMessages([...messages, newUserMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: 'Obrigado pelo seu interesse! Um dos nossos consultores entrará em contacto consigo brevemente. Pode também ligar para 968 677 320.',
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      id="chatbot"
      className="section-pinned gradient-bg flex items-center justify-center"
      style={{ zIndex: 20 }}
    >
      <div className="w-full px-6 lg:px-[8vw] pt-24 pb-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Content */}
        <div
          ref={leftContentRef}
          className="w-full lg:w-[38vw] flex flex-col gap-5"
        >
          <span className="font-mono-label text-primary">
            TESTE NA PRÁTICA
          </span>
          
          <h2 className="font-display font-bold text-display-2 text-white">
            Experimente o nosso Chatbot Humanizado
          </h2>
          
          <p className="text-lg text-text-secondary leading-relaxed">
            Veja em tempo real como o seu negócio pode atender clientes 24h por dia, 
            com respostas claras e naturais, sem depender de ninguém online.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <p className="text-text-secondary">
                Simula dúvidas reais de clientes de qualquer sector.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <p className="text-text-secondary">
                Responde com linguagem simples, sem "robotês".
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <p className="text-text-secondary">
                Encaminha para WhatsApp, telefone ou formulário quando faz sentido.
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-white font-medium mb-1">
              Testar chatbot em 10 segundos
            </p>
            <p className="text-text-secondary text-sm">
              Sem compromisso. Apenas uma demonstração.
            </p>
          </div>
        </div>

        {/* Chatbot Card */}
        <div
          ref={cardRef}
          className="w-full lg:w-[36vw] min-w-[320px] h-[64vh] min-h-[500px] glass-card flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
              <img
                src="/avatar-reborn.png"
                alt="Reborn AI"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-mono-label text-primary text-[10px]">
                REBORN AI
              </p>
              <p className="text-white text-sm font-medium">
                Assistente de Atendimento
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-white/10 text-white rounded-bl-md'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-white/10"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escreva uma mensagem..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/50"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center hover:bg-primary-light transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </form>

          {/* CTA Button */}
          <div className="p-4 pt-0">
            <a
              href="https://wa.me/351968677320?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Pack%20360."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Testar a Reborn Agora</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
