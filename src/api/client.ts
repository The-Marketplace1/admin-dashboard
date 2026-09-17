import axios from 'axios';
import { runtimeConfig } from '@/config/env';

export const gatewayClient = axios.create({
  baseURL: runtimeConfig.gatewayUrl,
  withCredentials: true,
  headers: {
    accept: 'application/json',
  },
});

gatewayClient.interceptors.request.use((request) => {
  request.headers.set('x-client-name', 'marketplace-admin-dashboard');
  return request;
});

export async function readGateway<T>(
  path: string,
  schema: { parse: (value: unknown) => T },
  params?: Record<string, string | number | undefined>,
) {
  const response = await gatewayClient.get(`${runtimeConfig.gatewayPrefix}${path}`, { params });
  return schema.parse(response.data);
}

export async function readGatewayHealth<T>(
  schema: { parse: (value: unknown) => T },
) {
  const response = await gatewayClient.get('/healthz');
  return schema.parse(response.data);
}

export async function writeGateway<T>(
  path: string,
  body: unknown,
  schema: { parse: (value: unknown) => T },
) {
  const response = await gatewayClient.post(`${runtimeConfig.gatewayPrefix}${path}`, body);
  return schema.parse(response.data);
}
