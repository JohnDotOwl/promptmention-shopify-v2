import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { isEmbedded, parseShopifyParams } from '@/lib/shopify';
import { useShopStore } from '@/stores/useShopStore';

export function ShopifyGuard() {
  const navigate = useNavigate();
  const { setShop, setLoading, shop, isLoading } = useShopStore();

  const session = parseShopifyParams();
  const embedded = isEmbedded();

  const { data, isError } = useQuery({
    queryKey: ['shopify-v2', 'shop', session?.shop],
    queryFn: async () => {
      const response = await apiClient.get('/shopify/shop', {
        params: session?.shop ? { shop: session.shop } : undefined,
      });
      return response.data;
    },
    enabled: !!session?.shop,
    retry: false,
  });

  useEffect(() => {
    if (data?.shop) {
      setShop(data.shop);
    }
  }, [data, setShop]);

  useEffect(() => {
    if (isError && !embedded) {
      setLoading(false);
      const query = session?.shop ? `?shop=${encodeURIComponent(session.shop)}` : '';
      navigate(`/install${query}`, { replace: true });
    }

    if (isError && embedded) {
      setLoading(false);
    }
  }, [embedded, isError, navigate, session?.shop, setLoading]);

  useEffect(() => {
    if (!session?.shop && !embedded) {
      setLoading(false);
      navigate('/install', { replace: true });
    }
  }, [embedded, navigate, session?.shop, setLoading]);

  useEffect(() => {
    if (shop) {
      setLoading(false);
    }
  }, [shop, setLoading]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <s-spinner size="large" />
      </div>
    );
  }

  if (!shop && embedded) {
    return (
      <s-page heading="Connecting your store">
        <s-section>
          <s-box padding="large" background="subdued" borderRadius="large-200" style={{ display: 'flex', minHeight: '60vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <s-stack gap="base" alignItems="center" inlineAlign="center">
              <s-spinner size="large" />
              <s-text type="strong">Finishing setup</s-text>
              <s-text color="subdued">We’re connecting PromptMention to your Shopify store.</s-text>
            </s-stack>
          </s-box>
        </s-section>
      </s-page>
    );
  }

  if (!shop) {
    return null;
  }

  return <Outlet />;
}
