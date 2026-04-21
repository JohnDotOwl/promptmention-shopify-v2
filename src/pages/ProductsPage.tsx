import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useShopStore } from '@/stores/useShopStore';

interface ProductsOverviewResponse {
  report_id: number | null;
  products: Array<{
    handle: string;
    title: string;
    product_type: string | null;
    price: string | null;
    image_url: string | null;
    cited: boolean;
    cited_count: number;
    total_intents: number;
    monthly_revenue_lost: number;
    attention: 'healthy' | 'high_priority' | 'needs_visibility';
  }>;
}

export function ProductsPage() {
  const shop = useShopStore((state) => state.shop);

  const { data, isLoading } = useQuery<ProductsOverviewResponse>({
    queryKey: ['shopify-v2', 'products-overview'],
    queryFn: async () => {
      const response = await apiClient.get('/shopify/products/overview', {
        params: { shop: shop?.shop_domain },
      });
      return response.data;
    },
    enabled: !!shop?.shop_domain,
  });

  const products = data?.products ?? [];

  return (
    <s-page heading="Products">
      <s-section>
        <s-box padding="base" background="subdued" borderRadius="large-200">
          <s-stack gap="small-200">
            <s-text type="strong">Product opportunities</s-text>
            <s-paragraph color="subdued">
              Once your latest run finishes, PromptMention will highlight which products appear healthy and which ones need stronger AI visibility support.
            </s-paragraph>
          </s-stack>
        </s-box>
      </s-section>

      <s-section heading="Latest product snapshot">
        <s-box padding="none" background="subdued" borderRadius="large-200">
          {isLoading ? (
            <s-stack gap="base" alignItems="center" inlineAlign="center" padding="large">
              <s-spinner size="large" />
              <s-text color="subdued">Loading products from your latest run...</s-text>
            </s-stack>
          ) : products.length === 0 ? (
            <s-stack gap="base" alignItems="center" inlineAlign="center" padding="large">
              <s-paragraph color="subdued">No product insights are available yet. Finish a run first and this page will populate automatically.</s-paragraph>
            </s-stack>
          ) : (
            <s-stack gap="small-100" padding="base">
              {products.slice(0, 10).map((product) => (
                <s-box key={product.handle} padding="base" background="default" borderRadius="base">
                  <s-stack direction="inline" justifyContent="space-between" alignItems="center">
                    <s-stack gap="small-100">
                      <s-text type="strong">{product.title}</s-text>
                      <s-text color="subdued">{product.product_type ?? 'Uncategorized'} · {product.price ?? '—'}</s-text>
                    </s-stack>
                    <s-badge tone={product.attention === 'healthy' ? 'success' : product.attention === 'high_priority' ? 'critical' : 'warning'}>
                      {product.attention === 'healthy'
                        ? 'Healthy'
                        : product.attention === 'high_priority'
                          ? 'High priority'
                          : 'Needs visibility'}
                    </s-badge>
                  </s-stack>
                </s-box>
              ))}
            </s-stack>
          )}
        </s-box>
      </s-section>
    </s-page>
  );
}
