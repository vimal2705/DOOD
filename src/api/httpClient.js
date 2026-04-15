import { API_CONFIG } from '../config/api';
import { sessionStore } from '../storage/session';

class HttpError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
  }
}

const withTimeout = (promise, timeoutMs) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Request timeout'));
    }, timeoutMs);

    promise
      .then(result => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch(err => {
        clearTimeout(timeoutId);
        reject(err);
      });
  });
};

export const httpRequest = async ({
  path,
  method = 'GET',
  headers,
  body,
  token,
  baseUrl = API_CONFIG.baseUrl,
  timeoutMs = API_CONFIG.timeoutMs,
}) => {
  const url = `${baseUrl}${path}`;

  const finalHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(headers || {}),
  };

  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const fetchPromise = fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  const res = await withTimeout(fetchPromise, timeoutMs);

  const contentType = res.headers?.get?.('content-type') || '';
  const isJson = contentType.includes('application/json');

  const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

  if (!res.ok) {
    // Handle token expiry (401 Unauthorized)
    if (res.status === 401) {
      // Clear the session token as it's invalid/expired
      sessionStore.clear();
    }

    const message =
      (data && (data.message || data.error)) ||
      `Request failed (${res.status})`;
    throw new HttpError(message, { status: res.status, data });
  }

  return data;
};

export { HttpError };
