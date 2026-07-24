import { useState } from 'react';
import './Contato.css';

export function Contato() {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! (Mocado para testes)');
    setFormData({ nome: '', email: '', mensagem: '' });
  };

  return (
    <div className="contato-page">
      <div className="page-header">
        <div className="container">
          <h1>Fale <span style={{ color: 'var(--primary)' }}>Conosco</span></h1>
          <p>Tire suas dúvidas, solicite um orçamento ou agende uma visita.</p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="contato-grid">
          {/* Informações e FAQ */}
          <div className="contato-info">
            <h2>Informações de Contato</h2>
            <div className="info-item">
              <strong>Endereço:</strong>
              <p>Av. Renata, 383 - Vila Formosa, São Paulo - SP</p>
            </div>
            <div className="info-item">
              <strong>WhatsApp / Telefone:</strong>
              <p><a href="tel:+551127170043">(11) 2717-0043</a></p>
            </div>
            <div className="info-item">
              <strong>E-mail:</strong>
              <p><a href="mailto:contato@amortecedorestamura.com">contato@amortecedorestamura.com</a></p>
            </div>
            <div className="info-item">
              <strong>Horário de Funcionamento:</strong>
              <p>Seg a Sex: 08:00 às 18:00<br/>Sábados: 08:00 às 13:00</p>
            </div>

            <h2 style={{ marginTop: '40px' }}>Perguntas Frequentes</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h4>Vocês parcelam os serviços?</h4>
                <p>Sim, parcelamos em até 6x sem juros nos cartões de crédito.</p>
              </div>
              <div className="faq-item">
                <h4>É necessário agendar horário?</h4>
                <p>Não é obrigatório, mas recomendamos o agendamento para evitar filas de espera.</p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="contato-form-container">
            <h2>Envie uma mensagem</h2>
            <form onSubmit={handleSubmit} className="contato-form">
              <div className="form-group">
                <label htmlFor="nome">Seu Nome</label>
                <input 
                  type="text" 
                  id="nome" 
                  name="nome" 
                  value={formData.nome} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ex: João da Silva"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ex: joao@email.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="mensagem">Como podemos ajudar?</label>
                <textarea 
                  id="mensagem" 
                  name="mensagem" 
                  rows={5}
                  value={formData.mensagem} 
                  onChange={handleChange} 
                  required 
                  placeholder="Descreva o problema do seu veículo ou o serviço que procura."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Enviar Mensagem</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
