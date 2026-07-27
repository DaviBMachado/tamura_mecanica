import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FaSpinner } from 'react-icons/fa';

// Code Splitting - Lazy Loading de Páginas
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Servicos = lazy(() => import('./pages/Servicos').then(m => ({ default: m.Servicos })));
const Sobre = lazy(() => import('./pages/Sobre').then(m => ({ default: m.Sobre })));
const Contato = lazy(() => import('./pages/Contato').then(m => ({ default: m.Contato })));
const Promocoes = lazy(() => import('./pages/Promocoes').then(m => ({ default: m.Promocoes })));
const Faq = lazy(() => import('./pages/Faq').then(m => ({ default: m.Faq })));
const Tips = lazy(() => import('./pages/Tips').then(m => ({ default: m.Tips })));

function PageFallback() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#555' }}>
      <FaSpinner className="spinner" style={{ animation: 'spin 1s linear infinite', fontSize: '2.5rem', marginBottom: '15px', color: 'var(--primary)' }} />
      <p>Carregando conteúdo...</p>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        
        <main style={{ flexGrow: 1 }}>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/promocoes" element={<Promocoes />} />
              <Route path="/dicas" element={<Tips />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="*" element={
                <div className="container section-padding" style={{ textAlign: 'center' }}>
                  <h2>Página Não Encontrada</h2>
                </div>
              } />
            </Routes>
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
