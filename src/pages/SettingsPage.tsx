import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useShopStore } from '@/stores/useShopStore';

export function SettingsPage() {
  const shop = useShopStore((state) => state.shop);

  const { data: billing } = useQuery({
    queryKey: ['shopify-v2', 'billing'],
    queryFn: async () => {
      const response = await apiClient.get('/shopify/billing/status', {
        params: { shop: shop?.shop_domain },
      });
      return response.data;
    },
    enabled: !!shop?.shop_domain,
  });

  return (
    <s-page heading="Settings">
      <s-section heading="Store information">
        <s-box padding="base" background="subdued" borderRadius="large-200">
          <s-stack gap="base">
            <s-stack gap="small-100">
              <s-text color="subdued">Store</s-text>
              <s-text type="strong">{shop?.shop_name ?? shop?.shop_domain}</s-text>
            </s-stack>
            <s-stack gap="small-100">
              <s-text color="subdued">Domain</s-text>
              <s-text>{shop?.shop_domain}</s-text>
            </s-stack>
            {shop?.email && (
              <s-stack gap="small-100">
                <s-text color="subdued">Email</s-text>
                <s-text>{shop.email}</s-text>
              </s-stack>
            )}
          </s-stack>
        </s-box>
      </s-section>

      <s-section heading="Billing">
        <s-box padding="base" background="subdued" borderRadius="large-200">
          <s-stack gap="base">
            <s-stack direction="inline" gap="base" alignItems="center">
              <s-text color="subdued">Subscription status</s-text>
              {billing?.active ? <s-badge tone="success">Active</s-badge> : <s-badge tone="default">No subscription</s-badge>}
            </s-stack>
            {billing?.plan && <s-text type="strong">Current plan: {billing.plan}</s-text>}
          </s-stack>
        </s-box>
      </s-section>
    </s-page>
  );
}
