import { Link } from 'react-router-dom';
import { COMPANY_CONFIG } from '../constants/companyConfig';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>{COMPANY_CONFIG.name}</h4>
            <p>{COMPANY_CONFIG.address}</p>
          </div>
          
          <div className="footer-col">
            <h4>Contato</h4>
            <ul className="footer-links">
              <li><a href={`tel:+${COMPANY_CONFIG.phoneRaw}`}>{COMPANY_CONFIG.phone}</a></li>
              <li><a href={`mailto:${COMPANY_CONFIG.email}`}>{COMPANY_CONFIG.email}</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><Link to="/privacidade">Política de Privacidade</Link></li>
              <li><Link to="/termos">Termos de Uso</Link></li>
              <li>CNPJ: {COMPANY_CONFIG.cnpj}</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} {COMPANY_CONFIG.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
