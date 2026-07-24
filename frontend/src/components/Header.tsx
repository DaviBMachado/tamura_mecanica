import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import './Header.css';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          TAMURA
        </Link>
        
        <button 
          className="hamburger" 
          onClick={toggleMenu}
          aria-label="Alternar Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/servicos" onClick={closeMenu}>Serviços</Link>
            </li>
            <li className="nav-item">
              <Link to="/promocoes" onClick={closeMenu}>Promoções</Link>
            </li>
            <li className="nav-item">
              <Link to="/dicas" onClick={closeMenu}>Dicas</Link>
            </li>
            <li className="nav-item">
              <Link to="/faq" onClick={closeMenu}>FAQ</Link>
            </li>
            <li className="nav-item">
              <Link to="/sobre" onClick={closeMenu}>Sobre Nós</Link>
            </li>
            <li className="nav-item">
              <Link to="/contato" onClick={closeMenu}>Contato</Link>
            </li>
          </ul>

          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebook size={20} /></a>
            <a href="#" aria-label="Twitter"><FaTwitter size={20} /></a>
            <a href="#" aria-label="YouTube"><FaYoutube size={20} /></a>
            <a href="#" aria-label="Instagram"><FaInstagram size={20} /></a>
          </div>

          <a 
            href="https://wa.me/551127170043" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary cta-btn"
          >
            Agendar Revisão
          </a>
        </nav>
      </div>
    </header>
  );
}
