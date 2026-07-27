import useSWR from 'swr';
import { Card } from '../components/Card';
import { FaTag, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import { apiClient, ApiError } from '../services/apiClient';
import { COMPANY_CONFIG } from '../constants/companyConfig';
import { safeGetItem, safeSetItem } from '../utils/storage';
import type { Promocao } from '../types';
import './Promocoes.css';

interface ApiResponse {
  status: string;
  data: Promocao[];
}

const fetcher = (url: string) => apiClient<ApiResponse>(url);

export function Promocoes() {
  const { data, error, isLoading } = useSWR('/api/promocoes', fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 10000,
    onSuccess: (res) => {
      if (res?.data) {
        safeSetItem('tamura_promocoes_cache', res.data);
      }
    },
  });

  // Check fallback cache if error occurs
  let displayPromocoes: Promocao[] = data?.data || [];
  let isUsingFallback = false;

  if (error && !data) {
    const cachedData = safeGetItem<Promocao[]>('tamura_promocoes_cache', []);
    if (cachedData.length > 0) {
      displayPromocoes = cachedData;
      isUsingFallback = true;
    }
  }

  const handleAgendar = () => {
    window.open(COMPANY_CONFIG.whatsappUrl, '_blank');
  };

  const getErrorMessage = () => {
    if (error instanceof ApiError && error.status === 429) {
      return 'Limite de requisições excedido. Exibindo dados locais ou tente novamente em instantes.';
    }
    return 'Promoções indisponíveis no momento. Tente novamente mais tarde.';
  };

  return (
    <div className="promocoes-page">
      <div className="promocoes-header">
        <div className="container">
          <h1 className="promocoes-header-title">
            Nossas <span>Promoções</span>
          </h1>
          <p className="promocoes-header-subtitle">Ofertas exclusivas com tempo limitado.</p>
        </div>
      </div>

      <div className="container promocoes-container">
        {isLoading && (
          <div className="promocoes-status-block">
            <FaSpinner className="spinner" style={{ animation: 'spin 1s linear infinite', fontSize: '2rem', marginBottom: '10px' }} />
            <p>Carregando ofertas diretamente da nossa planilha...</p>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {error && !isUsingFallback && (
          <div className="promocoes-error-block">
            <FaExclamationCircle style={{ fontSize: '2rem', marginBottom: '10px' }} />
            <p>{getErrorMessage()}</p>
          </div>
        )}

        {!isLoading && displayPromocoes.length === 0 && !error && (
          <div className="promocoes-status-block">
            <p>No momento não temos nenhuma promoção ativa. Fique de olho ou agende uma revisão comum!</p>
          </div>
        )}

        {displayPromocoes.length > 0 && (
          <div className="promocoes-grid">
            {displayPromocoes.map((promo) => {
              const uniqueKey = `promo-${promo.titulo.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <Card 
                  key={uniqueKey}
                  title={promo.titulo}
                  description={promo.descricao}
                  icon={<FaTag />}
                  actionLabel="Garantir Oferta"
                  onAction={handleAgendar}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
