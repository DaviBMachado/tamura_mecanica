import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary capturou uma exceção:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-alt, #f8f9fa)',
        }}>
          <FaExclamationTriangle style={{ fontSize: '3rem', color: 'var(--primary, #d9534f)', marginBottom: '20px' }} />
          <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Ops! Algo deu errado.</h2>
          <p style={{ color: '#666', maxWidth: '500px', marginBottom: '25px', lineHeight: '1.5' }}>
            Encontramos um problema inesperado ao carregar esta parte da aplicação. Tente recarregar a página ou voltar para a tela inicial.
          </p>
          <button 
            onClick={this.handleReset} 
            className="btn btn-primary"
            style={{ padding: '12px 24px', cursor: 'pointer' }}
          >
            Voltar para o Início
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
