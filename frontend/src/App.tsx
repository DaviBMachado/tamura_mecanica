import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Servicos } from './pages/Servicos';
import { Sobre } from './pages/Sobre';
import { Contato } from './pages/Contato';
import { Promocoes } from './pages/Promocoes';
import { Faq } from './pages/Faq';
import { Tips } from './pages/Tips';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        
        <main style={{ flexGrow: 1 }}>
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
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
