interface AssetFetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

interface Env {
  ASSETS: AssetFetcher;
}

interface WorkerHandler<Environment> {
  fetch(request: Request, env: Environment): Promise<Response>;
}

function isAssetPath(pathname: string) {
  return pathname.startsWith('/assets/') || pathname === '/favicon.svg' || pathname === '/robots.txt';
}

function looksLikeStaticFile(pathname: string) {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (isAssetPath(url.pathname) || looksLikeStaticFile(url.pathname)) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.headers.get('content-type')?.includes('text/html')) {
        return new Response('Not found', { status: 404 });
      }
      return assetResponse;
    }

    return env.ASSETS.fetch(new Request(new URL('/', request.url), request));
  },
} satisfies WorkerHandler<Env>;
