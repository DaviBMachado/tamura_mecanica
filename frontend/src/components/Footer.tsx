import { Link } from 'react-router-dom';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Amortecedores Tamura</h4>
            <p>Av. Renata, 383 - Vila Formosa<br />São Paulo - SP</p>
          </div>
          
          <div className="footer-col">
            <h4>Contato</h4>
            <ul className="footer-links">
              <li><a href="tel:+551127170043">(11) 2717-0043</a></li>
              <li><a href="mailto:contato@amortecedorestamura.com">contato@amortecedorestamura.com</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><Link to="/privacidade">Política de Privacidade</Link></li>
              <li><Link to="/termos">Termos de Uso</Link></li>
              <li>CNPJ: 00.000.000/0000-00</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Amortecedores Tamura. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
