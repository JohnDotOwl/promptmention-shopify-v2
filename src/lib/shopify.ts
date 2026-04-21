export interface ShopifySession {
  shop: string;
  host?: string;
  embedded: boolean;
}

export interface ShopifyGlobal {
  loading?: boolean;
  idToken?: () => Promise<string>;
}

export function parseShopifyParams(): ShopifySession | null {
  const params = new URLSearchParams(window.location.search);
  const shop = params.get('shop');

  if (!shop) return null;

  return {
    shop,
    host: params.get('host') ?? undefined,
    embedded: params.get('embedded') === '1',
  };
}

export function decodeHost(host: string): string {
  let padded = host;
  while (padded.length % 4 !== 0) {
    padded += '=';
  }
  return atob(padded);
}

export function getEmbeddedAppUrl(host: string): string {
  const decoded = decodeHost(host);
  return `${decoded}/apps/${import.meta.env.VITE_SHOPIFY_API_KEY}`;
}

declare global {
  interface Window {
    shopify?: ShopifyGlobal;
  }
}

export function isEmbedded(): boolean {
  return parseShopifyParams()?.embedded ?? false;
}

export async function getShopifyIdToken(): Promise<string | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  const token = await window.shopify?.idToken?.().catch(() => null);
  return token ?? null;
}
