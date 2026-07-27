import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { AccordionItem } from '../components/AccordionItem';

describe('Card Component', () => {
  it('renders title and description correctly', () => {
    render(<Card title="Troca de Amortecedor" description="Serviço especializado de suspensão" />);
    expect(screen.getByText('Troca de Amortecedor')).toBeInTheDocument();
    expect(screen.getByText('Serviço especializado de suspensão')).toBeInTheDocument();
  });

  it('triggers onAction callback when button is clicked', () => {
    const handleAction = vi.fn();
    render(<Card title="Promoção" description="Desconto especial" actionLabel="Garantir" onAction={handleAction} />);
    
    const button = screen.getByText('Garantir');
    fireEvent.click(button);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });
});

describe('Header Component', () => {
  it('renders navigation links and logo correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('TAMURA')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Serviços')).toBeInTheDocument();
    expect(screen.getByText('Promoções')).toBeInTheDocument();
  });
});

describe('AccordionItem Component', () => {
  it('toggles answer visibility when clicked', () => {
    render(<AccordionItem pergunta="Qual a garantia?" resposta="Oferecemos 1 ano de garantia." />);
    
    expect(screen.getByText('Qual a garantia?')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /qual a garantia\?/i });
    
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
