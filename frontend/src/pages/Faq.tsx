import { AccordionItem } from '../components/AccordionItem';
import { faqData } from '../data/faqData';

export function Faq() {
  return (
    <div className="faq-page">
      <div className="page-header">
        <div className="container">
          <h1>Perguntas <span style={{ color: 'var(--primary)' }}>Frequentes</span></h1>
          <p>Tire suas dúvidas sobre nossos serviços, garantias e pagamentos.</p>
        </div>
      </div>

      <div className="container section-padding" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="faq-list">
          {faqData.map((item) => (
            <AccordionItem 
              key={`faq-${item.pergunta.slice(0, 20)}`} 
              pergunta={item.pergunta} 
              resposta={item.resposta} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
