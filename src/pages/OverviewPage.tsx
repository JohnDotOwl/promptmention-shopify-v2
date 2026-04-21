import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useShopStore } from '@/stores/useShopStore';
import { usePolarisClick } from '@/lib/use-polaris-click';

interface OverviewResponse {
  state: 'not_started' | 'collecting' | 'ready' | 'attention_needed';
  headline: string;
  body: string;
  metrics: {
    store_score: number;
    completed_runs: number;
    avg_score: number;
    keywords_analyzed: number;
    products_analyzed: number;
  };
  latest_run: {
    id: number;
    status: string;
    score: number;
    keywords_count: number;
    products_count: number;
    error: string | null;
    created_at: string;
  } | null;
}

export function OverviewPage() {
  const shop = useShopStore((state) => state.shop);

  const { data, isLoading } = useQuery<OverviewResponse>({
    queryKey: ['shopify-v2', 'overview'],
    queryFn: async () => {
      const response = await apiClient.get('/shopify/overview', {
        params: { shop: shop?.shop_domain },
      });
      return response.data;
    },
    enabled: !!shop?.shop_domain,
  });

  const latest = data?.latest_run ?? null;
  const runAuditRef = usePolarisClick<HTMLElement>(() => {
    window.location.href = '/activity';
  });

  return (
    <s-page heading="Overview">
      <s-section>
        <s-box padding="large" background="subdued" borderRadius="large-200">
          <s-stack gap="base">
            <s-stack gap="small-200">
              <s-text type="strong" style={{ fontSize: '1.25rem' }}>
                {shop?.shop_name ?? shop?.shop_domain ?? 'Your store'}
              </s-text>
              <s-paragraph color="subdued">
                This workspace is built for merchants first. We collect your store data in the background, then surface what matters most once analysis is ready.
              </s-paragraph>
            </s-stack>

            {isLoading ? (
              <s-stack direction="inline" gap="small-200" alignItems="center">
                <s-spinner size="base" />
                <s-text color="subdued">Loading your latest store status...</s-text>
              </s-stack>
            ) : (
              <s-banner
                tone={
                  data?.state === 'ready'
                    ? 'success'
                    : data?.state === 'attention_needed'
                      ? 'warning'
                      : 'info'
                }
                heading={data?.headline ?? 'Store overview'}
              >
                {data?.body}
              </s-banner>
            )}

            <s-stack direction="inline" gap="base">
            <s-button ref={runAuditRef} variant="primary" data-href="/activity">
              {latest ? 'Open activity' : 'Start first audit'}
            </s-button>
            </s-stack>
          </s-stack>
        </s-box>
      </s-section>

      <s-section>
        <s-grid gridTemplateColumns="repeat(3, 1fr)" gap="base">
          <s-grid-item>
            <MetricCard label="Store score" value={isLoading ? '—' : String(Math.round(data?.metrics.store_score ?? 0))} hint="Latest completed run" />
          </s-grid-item>
          <s-grid-item>
            <MetricCard label="Runs completed" value={isLoading ? '—' : String(data?.metrics.completed_runs ?? 0)} hint="Completed runs only" />
          </s-grid-item>
          <s-grid-item>
            <MetricCard label="Keywords analyzed" value={isLoading ? '—' : String(data?.metrics.keywords_analyzed ?? 0)} hint="Latest run only" />
          </s-grid-item>
        </s-grid>
      </s-section>

      <s-section heading="What happens next">
        <s-grid gridTemplateColumns="repeat(3, 1fr)" gap="base">
          <StepCard title="1. Gather store data" body="We collect your product catalog and prepare it for AI visibility analysis." tone="info" />
          <StepCard title="2. Analyze visibility" body="We process search intent, keyword coverage, and engine response signals." tone="warning" />
          <StepCard title="3. Show useful actions" body="We surface product-level priorities and clear follow-up actions for your store." tone="success" />
        </s-grid>
      </s-section>
    </s-page>
  );
}

function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <s-box padding="base" background="subdued" borderRadius="large-200">
      <s-stack gap="small-100">
        <s-text color="subdued">{label}</s-text>
        <s-text type="strong" style={{ fontSize: '1.75rem', fontVariantNumeric: 'tabular-nums' }}>
          {value}
        </s-text>
        <s-text color="subdued">{hint}</s-text>
      </s-stack>
    </s-box>
  );
}

function StepCard({ title, body, tone }: { title: string; body: string; tone: 'success' | 'warning' | 'info' }) {
  return (
    <s-box padding="base" background="subdued" borderRadius="large-200">
      <s-stack gap="small-200">
        <s-badge tone={tone}>{title}</s-badge>
        <s-paragraph color="subdued">{body}</s-paragraph>
      </s-stack>
    </s-box>
  );
}
