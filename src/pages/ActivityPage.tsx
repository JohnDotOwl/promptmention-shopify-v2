import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useShopStore } from '@/stores/useShopStore';
import { usePolarisClick } from '@/lib/use-polaris-click';

interface ReportRow {
  id: number;
  status: string;
  score: number;
  keywords_count: number;
  products_count: number;
  store_name: string | null;
  error: string | null;
  created_at: string;
}

export function ActivityPage() {
  const shop = useShopStore((state) => state.shop);

  const { data, isLoading } = useQuery({
    queryKey: ['shopify-v2', 'reports'],
    queryFn: async () => {
      const response = await apiClient.get('/shopify/reports', {
        params: { shop: shop?.shop_domain },
      });
      return response.data;
    },
    enabled: !!shop?.shop_domain,
  });

  const reports: ReportRow[] = data?.reports ?? [];
  const triggerRef = usePolarisClick<HTMLElement>(() => {
    window.location.href = '/products';
  });

  return (
    <s-page heading="Activity">
      <s-section>
        <s-box padding="base" background="subdued" borderRadius="large-200">
          <s-stack gap="base">
            <s-text type="strong">Background processing</s-text>
            <s-paragraph color="subdued">
              This view helps merchants understand what PromptMention is doing in the background and whether a run is still processing or ready to review.
            </s-paragraph>
            <s-button ref={triggerRef} variant="primary" data-href="/products">
              Review products
            </s-button>
          </s-stack>
        </s-box>
      </s-section>

      <s-section heading="Recent runs">
        <s-box padding="none" background="subdued" borderRadius="large-200">
          {isLoading ? (
            <s-stack gap="base" alignItems="center" inlineAlign="center" padding="large">
              <s-spinner size="large" />
              <s-text color="subdued">Loading recent activity...</s-text>
            </s-stack>
          ) : reports.length === 0 ? (
            <s-stack gap="base" alignItems="center" inlineAlign="center" padding="large">
              <s-paragraph color="subdued">No runs have been created for this store yet.</s-paragraph>
            </s-stack>
          ) : (
            <s-stack gap="small-100" padding="base">
              {reports.map((report) => (
                <RunCard key={report.id} report={report} />
              ))}
            </s-stack>
          )}
        </s-box>
      </s-section>
    </s-page>
  );
}

function RunCard({ report }: { report: ReportRow }) {
  const tone = report.status === 'completed' ? 'success' : report.status === 'failed' ? 'critical' : 'info';

  return (
    <s-box padding="base" background="default" borderRadius="base">
      <s-stack gap="small-200">
        <s-stack direction="inline" justifyContent="space-between" alignItems="center">
          <s-stack direction="inline" gap="small-200" alignItems="center">
            <s-text type="strong">Run #{report.id}</s-text>
            <s-badge tone={tone}>{report.status}</s-badge>
          </s-stack>
          <s-text color="subdued">{new Date(report.created_at).toLocaleString()}</s-text>
        </s-stack>
        <s-stack direction="inline" gap="base">
          <s-text color="subdued">Score: {Math.round(report.score)}</s-text>
          <s-text color="subdued">Keywords: {report.keywords_count}</s-text>
          <s-text color="subdued">Products: {report.products_count}</s-text>
        </s-stack>
        {report.error && <s-paragraph tone="critical">{report.error}</s-paragraph>}
      </s-stack>
    </s-box>
  );
}
