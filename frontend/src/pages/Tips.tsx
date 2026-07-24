import { useState, useEffect } from 'react';
import { YouTubeEmbed } from '../components/YouTubeEmbed';
import { dicasViagem } from '../data/dicasData';
import { FaCheckCircle, FaCarSide, FaSpinner } from 'react-icons/fa';

interface Video {
  id: string;
  titulo: string;
}

export function Tips() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dicas/videos');
        if (response.ok) {
          const result = await response.json();
          setVideos(result.data || []);
        } else {
          console.error("Falha ao buscar vídeos.");
        }
      } catch (err) {
        console.error("Erro ao conectar com API de dicas.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="tips-page">
      <div className="page-header">
        <div className="container">
          <h1>Dicas e <span style={{ color: 'var(--primary)' }}>Vídeos</span></h1>
          <p>Aprenda a cuidar melhor do seu carro com nosso conteúdo multimídia.</p>
        </div>
      </div>

      <div className="container section-padding">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
          
          {/* Seção de Vídeos do YouTube */}
          <section>
            <h2 style={{ marginBottom: '20px', borderBottom: '2px solid var(--primary)', paddingBottom: '10px', display: 'inline-block' }}>
              Últimos Vídeos
            </h2>
            
            {loading ? (
              <div style={{ textAlign: 'center', color: '#555', padding: '40px' }}>
                <FaSpinner style={{ animation: 'spin 1s linear infinite', fontSize: '2rem', marginBottom: '10px' }} />
                <p>Sincronizando com o YouTube...</p>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              </div>
            ) : videos.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                {videos.map((video, index) => (
                  <div key={index} style={{ backgroundColor: 'var(--bg-alt)', padding: '15px', borderRadius: 'var(--radius-lg)' }}>
                    <YouTubeEmbed videoId={video.id} title={video.titulo} />
                    <h3 style={{ fontSize: '1.1rem', marginTop: '15px' }}>{video.titulo}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#555' }}>Nenhum vídeo carregado no momento.</p>
            )}

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <a 
                href="https://www.youtube.com/channel/UCtLRUKc2GLewDhBIfMG9K_g" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Acessar nosso Canal Completo
              </a>
            </div>
          </section>

          {/* Seção de Checklist de Viagem */}
          <section style={{ marginTop: '30px', backgroundColor: 'var(--bg-alt)', padding: '40px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <FaCarSide size={32} color="var(--primary)" style={{ marginRight: '15px' }} />
              <h2>Checklist: Dicas antes de Viajar</h2>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {dicasViagem.map((dica, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px', fontSize: '1.1rem' }}>
                  <FaCheckCircle color="var(--primary)" style={{ marginTop: '4px', marginRight: '12px', flexShrink: 0 }} />
                  <span>{dica}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '30px' }}>
              <a href="/servicos" className="btn btn-primary">Agendar Revisão de Férias</a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
