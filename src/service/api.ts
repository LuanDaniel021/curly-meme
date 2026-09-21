const BASE_URL = 'https://fictional-memory-31a3.onrender.com/api';

async function request(endpoint: string, method: string, body: any = null, customHeaders: Record<string, string> = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint.replace(/^\//, '')}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error((errorData as any).message || `Erro ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return null;
  } catch (error) {
    console.error(`Erro na requisição ${method} /${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  get: (endpoint: string, headers?: Record<string, string>) => request(endpoint, 'GET', null, headers),
  post: (endpoint: string, body?: any, headers?: Record<string, string>) => request(endpoint, 'POST', body, headers),
  put: (endpoint: string, body?: any, headers?: Record<string, string>) => request(endpoint, 'PUT', body, headers),
  patch: (endpoint: string, body?: any, headers?: Record<string, string>) => request(endpoint, 'PATCH', body, headers),
  delete: (endpoint: string, headers?: Record<string, string>) => request(endpoint, 'DELETE', null, headers),
};