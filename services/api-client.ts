import 'server-only';
import qs from 'qs';

const API_ENDPOINT = process.env.API_ENDPOINT;

if (!API_ENDPOINT) {
  throw new Error('API_ENDPOINT environment variable is required');
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_ENDPOINT!) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const queryString = params ? qs.stringify(params, { encodeValuesOnly: true }) : '';
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request<T>(url);
  }
}

export const apiClient = new ApiClient();
