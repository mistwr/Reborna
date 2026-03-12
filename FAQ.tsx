import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'O valor mensal é só esse mesmo? Sem surpresas?',
    answer:
      'Sim. 299,99€ é o valor mensal do Pack Digital 360º, já com desenvolvimento, configuração inicial, alojamento e suporte técnico. Não há taxa de instalação nem fidelização.',
  },
  {
    question: 'Quanto tempo demora a entrega?',
    answer:
      'Normalmente entregamos a primeira versão em 5 a 7 dias úteis após recebermos os dados da sua empresa. Trabalhamos com frameworks otimizados para acelerar o processo.',
  },
  {
    question: 'O Chatbot sabe responder a tudo sobre o meu negócio?',
    answer:
      'O Chatbot é treinado na fase de configuração com as informações que nos passar (preços, morada, serviços, dúvidas comuns). O que ele não souber, foi programado para encaminhar para um humano (WhatsApp ou telefone) de forma elegante, garantindo que o cliente nunca fica sem resposta.',
  },
  {
    question: 'Sou obrigado a investir em Publicidade Paga (Anúncios)?',
    answer:
      'Não, de forma alguma. O investimento em anúncios (Meta Ads ou Google Ads) é opcional e decidido por si. Nós recomendamos um valor mínimo para acelerar resultados, mas o pack funciona organicamente. O valor dos anúncios é pago diretamente às plataformas (Facebook/Google), sem comissões escondidas da nossa parte.',
  },
  {
    question: 'O domínio (www) e o alojamento estão incluídos?',
    answer:
      'O alojamento de alta performance está 100% incluído e gerido por nós (uma poupança de aprox. 150€/ano). O domínio (o nome do seu site) deve ser registado em seu nome para garantir que a propriedade da marca é sua. Se já tiver um, usamos esse. Se não tiver, ajudamos a registar na hora (custo médio de 10€ a 15€/ano).',
  },
  {
    question: 'O que acontece ao meu site se eu cancelar a subscrição?',
    answer:
      'O Pack Digital 360º funciona como um aluguer de tecnologia de ponta. Enquanto a subscrição estiver ativa, o seu ecossistema mantém-se no ar com suporte total. Se decidir cancelar, o serviço é interrompido no final do mês pago. No entanto, se quiser ficar com o site definitivamente, oferecemos uma opção de compra ("buyout") do código após 6 meses de permanência.',
  },
  {
    question: 'Emitem fatura com NIF português?',
    answer:
      'Sim. Somos uma empresa legalmente constituída e emitimos fatura mensal com IVA discriminado, totalmente dedutível como despesa de marketing na contabilidade da sua empresa.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const items = itemsRef.current;

    if (!section || !title || !items) return;

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        title,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Items stagger reveal
      const itemElements = items.querySelectorAll('.faq-item');
      gsap.fromTo(
        itemElements,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: items,
            start: 'top 75%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="w-full gradient-bg py-20 lg:py-32"
      style={{ zIndex: 90 }}
    >
      <div className="px-6 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Title */}
          <div className="lg:w-[34vw]">
            <h2
              ref={titleRef}
              className="font-display font-bold text-display-2 text-white sticky top-32"
            >
              Perguntas Frequentes
            </h2>
          </div>

          {/* Right Accordion */}
          <div ref={itemsRef} className="lg:w-[50vw] space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item glass-card-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <span className="text-white font-medium pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5">
                    <p className="text-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
