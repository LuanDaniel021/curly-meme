const BASE_URL = 'https://fictional-memory-31a3.onrender.com/api';

async function request(
  endpoint: string,
  method: string,
  body: unknown = null,
  customHeaders: Record<string, string> = {},
) {
  // Mostra o que está a ser enviado na consola do navegador
  if (body instanceof FormData) {
    console.log("--- CONTEÚDO DO FORMDATA ---");
    for (const [key, value] of body.entries()) {
      console.log(`${key}:`, value);
    }
  } else {
    console.log("--- BODY JSON ---", body);
  }

  const headers: Record<string, string> = {
    ...customHeaders,
  };

  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint.replace(/^\//, '')}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = typeof errorData === 'object' && errorData !== null && 'message' in errorData
        ? String(errorData.message)
        : `Erro ${response.status}: ${response.statusText}`;
      throw new Error(message);
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
  post: (endpoint: string, body?: unknown, headers?: Record<string, string>) => request(endpoint, 'POST', body, headers),
  put: (endpoint: string, body?: unknown, headers?: Record<string, string>) => request(endpoint, 'PUT', body, headers),
  patch: (endpoint: string, body?: unknown, headers?: Record<string, string>) => request(endpoint, 'PATCH', body, headers),
  delete: (endpoint: string, headers?: Record<string, string>) => request(endpoint, 'DELETE', null, headers),
};