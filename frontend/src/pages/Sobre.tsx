import './Sobre.css';

export function Sobre() {
  return (
    <div className="sobre-page">
      <div className="page-header" style={{ backgroundColor: 'var(--bg-alt)', padding: '60px 20px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Nossa <span style={{ color: 'var(--primary)' }}>História</span></h1>
          <p style={{ color: '#555', fontSize: '1.1rem' }}>Tradição e excelência no mercado automotivo.</p>
        </div>
      </div>

      <div className="container about-content">
        <h2 style={{ color: 'var(--primary)', marginBottom: '20px' }}>Tradição que passa de geração em geração</h2>
        <p>A Amortecedores Tamura nasceu com o propósito de oferecer segurança e conforto para os motoristas de São Paulo. Ao longo dos anos, construímos uma base sólida de confiança com nossos clientes, sempre entregando serviços de alta qualidade e utilizando as melhores peças do mercado.</p>
        <p>Nossa equipe é formada por especialistas apaixonados por mecânica, que se atualizam constantemente com as novas tecnologias automobilísticas para garantir que o seu veículo receba o melhor tratamento possível, desde um simples alinhamento até reparos complexos de suspensão.</p>

        <div className="mission-grid">
          <div className="mission-card">
            <h3>Missão</h3>
            <p>Garantir a segurança e o conforto dos nossos clientes através de serviços automotivos de excelência e atendimento transparente.</p>
          </div>
          <div className="mission-card">
            <h3>Visão</h3>
            <p>Ser a oficina mecânica referência em suspensão e freios na região, reconhecida pela qualidade técnica e confiança.</p>
          </div>
          <div className="mission-card">
            <h3>Valores</h3>
            <p>Transparência, qualidade técnica, respeito ao cliente, agilidade e compromisso com a segurança no trânsito.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
