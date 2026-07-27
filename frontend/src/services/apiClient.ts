const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export class ApiError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (response.status === 429) {
      throw new ApiError('Rate limit excedido. Tente novamente em um minuto.', 429, 'RATE_LIMIT');
    }

    if (!response.ok) {
      throw new ApiError(`Erro HTTP: ${response.status} ${response.statusText}`, response.status);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error?.message || 'Falha na conexão de rede com o servidor.', 0, 'NETWORK_ERROR');
  }
}
