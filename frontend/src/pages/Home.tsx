import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { FaWrench, FaShieldAlt, FaCogs } from 'react-icons/fa';
import './Home.css';

export function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Segurança e Conforto para o seu <span>Veículo</span>.</h1>
            <p>Especialistas em suspensão, freios e manutenção preventiva. O seu carro em boas mãos na região da Vila Formosa.</p>
            <div className="hero-buttons">
              <Link to="/servicos" className="btn btn-primary">Ver Nossos Serviços</Link>
              <Link to="/sobre" className="btn btn-secondary">Conhecer a Oficina</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destaque de Serviços */}
      <section className="home-services container section-padding">
        <h2 className="section-title">Especialidades Tamura</h2>
        <div className="card-grid">
          <Card 
            title="Troca de Amortecedores" 
            description="Amortecedores originais e recondicionados com garantia. Melhore a estabilidade do seu carro e garanta conforto na direção."
            icon={<FaWrench />}
            actionLabel="Saiba mais"
            actionLink="/servicos"
          />
          <Card 
            title="Manutenção de Freios" 
            description="Troca de pastilhas, discos e fluidos. Segurança em primeiro lugar para você e sua família, com diagnósticos precisos."
            icon={<FaShieldAlt />}
            actionLabel="Saiba mais"
            actionLink="/servicos"
          />
          <Card 
            title="Alinhamento e Balanceamento" 
            description="Evite o desgaste irregular dos pneus e garanta uma direção suave e segura. Utilizamos tecnologia de ponta 3D."
            icon={<FaCogs />}
            actionLabel="Saiba mais"
            actionLink="/servicos"
          />
        </div>
        <div className="center-btn">
          <Link to="/servicos" className="btn btn-secondary">Ver Todos os Serviços</Link>
        </div>
      </section>
      
      {/* Testimonials or Trust indicators */}
      <section className="home-trust">
        <div className="container">
          <h2>Mais de 20 anos de tradição em São Paulo</h2>
          <p>Nossa maior propaganda é a recomendação dos nossos clientes.</p>
        </div>
      </section>
    </div>
  );
}
