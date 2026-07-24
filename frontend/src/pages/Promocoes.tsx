import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { FaTag, FaSpinner, FaExclamationCircle } from 'react-icons/fa';

interface Promocao {
  titulo: string;
  descricao: string;
  valor_antigo: string;
  valor_promocional: string;
  validade: string;
  status: string;
}

export function Promocoes() {
  const [promocoes, setPromocoes] = useState<Promocao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPromocoes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/promocoes');
        if (response.status === 429) {
          throw new Error('rate_limit');
        }
        if (!response.ok) {
          throw new Error('server_error');
        }
        const result = await response.json();
        setPromocoes(result.data || []);
        localStorage.setItem('tamura_promocoes_cache', JSON.stringify(result.data || []));
      } catch (err: any) {
        // Fallback para o cache local do navegador
        const localCache = localStorage.getItem('tamura_promocoes_cache');
        if (localCache) {
          setPromocoes(JSON.parse(localCache));
        } else {
          setError('Promoções indisponíveis no momento. Tente novamente mais tarde.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPromocoes();
  }, []);

  const handleAgendar = () => {
    window.open('https://wa.me/551127170043', '_blank');
  };

  return (
    <div className="promocoes-page">
      <div className="page-header" style={{ backgroundColor: 'var(--bg-alt)', padding: '60px 20px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Nossas <span style={{ color: 'var(--primary)' }}>Promoções</span></h1>
          <p style={{ color: '#555', fontSize: '1.1rem' }}>Ofertas exclusivas com tempo limitado.</p>
        </div>
      </div>

      <div className="container section-padding" style={{ padding: '60px 20px', minHeight: '50vh' }}>
        {loading && (
          <div style={{ textAlign: 'center', color: '#555', padding: '40px' }}>
            <FaSpinner className="spinner" style={{ animation: 'spin 1s linear infinite', fontSize: '2rem', marginBottom: '10px' }} />
            <p>Carregando ofertas diretamente da nossa planilha...</p>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {error && !loading && (
          <div style={{ textAlign: 'center', color: 'var(--primary)', padding: '40px', backgroundColor: '#fff5f5', borderRadius: '8px' }}>
            <FaExclamationCircle style={{ fontSize: '2rem', marginBottom: '10px' }} />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && promocoes.length === 0 && (
          <div style={{ textAlign: 'center', color: '#555', padding: '40px' }}>
            <p>No momento não temos nenhuma promoção ativa. Fique de olho ou agende uma revisão comum!</p>
          </div>
        )}

        {!loading && !error && promocoes.length > 0 && (
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {promocoes.map((promo, index) => (
              <Card 
                key={index}
                title={promo.titulo}
                description={promo.descricao}
                icon={<FaTag />}
                actionLabel="Garantir Oferta"
                onAction={handleAgendar}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
