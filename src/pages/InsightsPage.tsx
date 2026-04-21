import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useShopStore } from '@/stores/useShopStore';

interface InsightsOverviewResponse {
  report_id: number | null;
  metrics: {
    tracked_keywords: number;
    cited_engine_responses: number;
    uncited_engine_responses: number;
  };
  top_keywords: Array<{
    id: number;
    query: string;
    monthly_volume: number | null;
    ai_volume: number | null;
    category: string | null;
  }>;
  engine_breakdown: Array<{
    engine: string;
    total: number;
    cited: number;
    uncited: number;
  }>;
}

export function InsightsPage() {
  const shop = useShopStore((state) => state.shop);

  const { data, isLoading } = useQuery<InsightsOverviewResponse>({
    queryKey: ['shopify-v2', 'insights-overview'],
    queryFn: async () => {
      const response = await apiClient.get('/shopify/insights/overview', {
        params: { shop: shop?.shop_domain },
      });
      return response.data;
    },
    enabled: !!shop?.shop_domain,
  });

  const keywords = data?.top_keywords ?? [];

  return (
    <s-page heading="Insights">
      <s-section>
        <s-grid gridTemplateColumns="repeat(2, 1fr)" gap="base">
          <s-grid-item>
            <InsightStat label="Tracked keyword ideas" value={isLoading ? '—' : String(data?.metrics.tracked_keywords ?? 0)} />
          </s-grid-item>
          <s-grid-item>
            <InsightStat label="Cited engine responses" value={isLoading ? '—' : String(data?.metrics.cited_engine_responses ?? 0)} />
          </s-grid-item>
        </s-grid>
      </s-section>

      <s-section heading="Top tracked queries">
        <s-box padding="base" background="subdued" borderRadius="large-200">
          <s-stack gap="small-200">
            <s-paragraph color="subdued">
              This screen highlights the strongest keyword opportunities currently visible in your latest run.
            </s-paragraph>
            {keywords.slice(0, 5).map((keyword) => (
              <s-box key={keyword.id} padding="base" background="default" borderRadius="base">
                <s-stack direction="inline" justifyContent="space-between" alignItems="center">
                  <s-stack gap="small-100">
                    <s-text type="strong">{keyword.query}</s-text>
                    <s-text color="subdued">{keyword.category ?? 'Keyword'} · monthly {keyword.monthly_volume ?? keyword.ai_volume ?? 0}</s-text>
                  </s-stack>
                  <s-badge tone="info">Tracked</s-badge>
                </s-stack>
              </s-box>
            ))}
          </s-stack>
        </s-box>
      </s-section>

      <s-section heading="Engine response breakdown">
        <s-box padding="base" background="subdued" borderRadius="large-200">
          <s-stack gap="small-200">
            {(data?.engine_breakdown ?? []).length === 0 ? (
              <s-paragraph color="subdued">No engine response data is available yet.</s-paragraph>
            ) : (
              (data?.engine_breakdown ?? []).map((engine) => (
                <s-box key={engine.engine} padding="base" background="default" borderRadius="base">
                  <s-stack direction="inline" justifyContent="space-between" alignItems="center">
                    <s-stack gap="small-100">
                      <s-text type="strong">{engine.engine}</s-text>
                      <s-text color="subdued">{engine.cited} cited · {engine.uncited} uncited</s-text>
                    </s-stack>
                    <s-badge tone={engine.cited > 0 ? 'success' : 'warning'}>{engine.total} total</s-badge>
                  </s-stack>
                </s-box>
              ))
            )}
          </s-stack>
        </s-box>
      </s-section>
    </s-page>
  );
}

function InsightStat({ label, value }: { label: string; value: string }) {
  return (
    <s-box padding="base" background="subdued" borderRadius="large-200">
      <s-stack gap="small-100">
        <s-text color="subdued">{label}</s-text>
        <s-text type="strong" style={{ fontSize: '1.75rem', fontVariantNumeric: 'tabular-nums' }}>
          {value}
        </s-text>
      </s-stack>
    </s-box>
  );
}
