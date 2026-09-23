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

export function getTokenFromResponse(response: unknown): string | null {
  if (!response || typeof response !== 'object') return null;

  const maybeData = 'data' in response && response.data && typeof response.data === 'object' ? response.data : response;

  const token =
    ('token' in maybeData && typeof maybeData.token === 'string' ? maybeData.token : null) ||
    ('access_token' in maybeData && typeof maybeData.access_token === 'string' ? maybeData.access_token : null) ||
    ('session' in maybeData && maybeData.session && typeof maybeData.session === 'object' && 'access_token' in maybeData.session && typeof maybeData.session.access_token === 'string' ? maybeData.session.access_token : null);

  return token;
}

export const api = {
  get: (endpoint: string, headers?: Record<string, string>) => request(endpoint, 'GET', null, headers),
  post: (endpoint: string, body?: unknown, headers?: Record<string, string>) => request(endpoint, 'POST', body, headers),
  put: (endpoint: string, body?: unknown, headers?: Record<string, string>) => request(endpoint, 'PUT', body, headers),
  patch: (endpoint: string, body?: unknown, headers?: Record<string, string>) => request(endpoint, 'PATCH', body, headers),
  delete: (endpoint: string, headers?: Record<string, string>) => request(endpoint, 'DELETE', null, headers),
  auth: {
    async login(payload: Record<string, string>) {
      const routes = ['/users/signin', '/users/singin', '/auth/login'];
      let lastError: unknown;

      for (const route of routes) {
        try {
          return await request(route, 'POST', payload);
        } catch (error) {
          lastError = error;
        }
      }

      throw lastError ?? new Error('Não foi possível efetuar o login.');
    },
    async register(payload: Record<string, string>) {
      const routes = ['/users/signup', '/users/singup', '/auth/register'];
      let lastError: unknown;

      for (const route of routes) {
        try {
          return await request(route, 'POST', payload);
        } catch (error) {
          lastError = error;
        }
      }

      throw lastError ?? new Error('Não foi possível criar a conta.');
    },
  },
};