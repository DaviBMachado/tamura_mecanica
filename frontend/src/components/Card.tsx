import { Link } from 'react-router-dom';
import './Card.css';

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  actionLink?: string;
}

export function Card({ 
  title, 
  description, 
  imageUrl, 
  icon,
  actionLabel = 'Saiba mais', 
  onAction,
  actionLink 
}: CardProps) {
  
  const ActionElement = () => {
    if (actionLink) {
      return (
        <Link to={actionLink} className="card-action-link">
          {actionLabel} &rarr;
        </Link>
      );
    }
    
    if (onAction) {
      return (
        <button onClick={onAction} className="card-action-btn">
          {actionLabel}
        </button>
      );
    }
    
    return null;
  };

  return (
    <div className="card">
      {imageUrl && (
        <div className="card-image-container">
          <img src={imageUrl} alt={title} className="card-image" />
        </div>
      )}
      
      {icon && !imageUrl && (
        <div className="card-icon">{icon}</div>
      )}
      
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        
        <div className="card-action">
          <ActionElement />
        </div>
      </div>
    </div>
  );
}
