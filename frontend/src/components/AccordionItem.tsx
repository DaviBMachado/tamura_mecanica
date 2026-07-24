import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Accordion.css';

interface AccordionItemProps {
  pergunta: string;
  resposta: string;
}

export function AccordionItem({ pergunta, resposta }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <button 
        className="accordion-header" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{pergunta}</span>
        <span className="accordion-icon">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      <div className="accordion-content">
        <p>{resposta}</p>
      </div>
    </div>
  );
}
