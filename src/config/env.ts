const gatewayUrl = import.meta.env.VITE_API_GATEWAY_URL?.trim() ?? '';
const gatewayPrefix = import.meta.env.VITE_API_GATEWAY_PREFIX?.trim() || '/admin';

export const runtimeConfig = {
  gatewayUrl: gatewayUrl.replace(/\/+$/, ''),
  gatewayPrefix: gatewayPrefix.startsWith('/') ? gatewayPrefix : `/${gatewayPrefix}`,
} as const;
