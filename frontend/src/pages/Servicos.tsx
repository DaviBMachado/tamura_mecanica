import { Card } from '../components/Card';
import { FaWrench, FaShieldAlt, FaCogs, FaCar, FaOilCan, FaTools } from 'react-icons/fa';

export function Servicos() {
  const servicos = [
    {
      id: 1,
      title: 'Amortecedores',
      description: 'Nossa especialidade. Trabalhamos com suspensão completa para veículos nacionais e importados.',
      icon: <FaWrench />
    },
    {
      id: 2,
      title: 'Freios',
      description: 'Revisão completa do sistema de frenagem. Troca de pastilhas, discos, lonas e fluido.',
      icon: <FaShieldAlt />
    },
    {
      id: 3,
      title: 'Alinhamento 3D',
      description: 'Tecnologia de ponta para garantir a estabilidade e aumentar a vida útil dos seus pneus.',
      icon: <FaCogs />
    },
    {
      id: 4,
      title: 'Balanceamento',
      description: 'Remoção de trepidações no volante e desgaste precoce das peças da suspensão.',
      icon: <FaCar />
    },
    {
      id: 5,
      title: 'Troca de Óleo',
      description: 'Óleos originais de fábrica para o motor do seu carro trabalhar livre de impurezas.',
      icon: <FaOilCan />
    },
    {
      id: 6,
      title: 'Injeção Eletrônica',
      description: 'Diagnóstico computadorizado e limpeza de bicos para economia de combustível.',
      icon: <FaTools />
    }
  ];

  const handleAgendar = () => {
    window.open('https://wa.me/551127170043', '_blank');
  };

  return (
    <div className="servicos-page">
      <div className="page-header" style={{ backgroundColor: 'var(--bg-alt)', padding: '60px 20px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Central de <span style={{ color: 'var(--primary)' }}>Serviços</span></h1>
          <p style={{ color: '#555', fontSize: '1.1rem' }}>Conheça tudo o que podemos fazer pelo seu veículo.</p>
        </div>
      </div>

      <div className="container section-padding" style={{ padding: '60px 20px' }}>
        <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {servicos.map((servico) => (
            <Card 
              key={servico.id}
              title={servico.title}
              description={servico.description}
              icon={servico.icon}
              actionLabel="Agendar Serviço"
              onAction={handleAgendar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
