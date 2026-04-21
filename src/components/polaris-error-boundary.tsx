import * as React from 'react';
import { useNavigate } from 'react-router';
import { usePolarisClick } from '@/lib/use-polaris-click';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class PolarisErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[PolarisErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error }: { error: Error | null }) {
  const navigate = useNavigate();
  const homeRef = usePolarisClick<HTMLElement>(() => navigate('/overview'));
  const reloadRef = usePolarisClick<HTMLElement>(() => window.location.reload());

  return (
    <s-page heading="Error">
      <s-section>
        <s-box padding="base" background="subdued" borderRadius="large-200">
          <s-stack gap="base" alignItems="center" inlineAlign="center">
            <s-icon type="alert-diamond" tone="critical" size="large" />
            <s-text type="strong" tone="critical">
              Something went wrong
            </s-text>
            <s-paragraph color="subdued" style={{ textAlign: 'center' }}>
              We hit an unexpected error while loading your Shopify workspace.
            </s-paragraph>
            <s-stack direction="inline" gap="base">
              <s-button ref={homeRef} variant="secondary" data-href="/overview">
                Go to overview
              </s-button>
              <s-button ref={reloadRef} variant="primary">
                Refresh page
              </s-button>
            </s-stack>
            {import.meta.env.DEV && error && (
              <s-box padding="base" background="subdued" borderRadius="base" style={{ maxWidth: '600px', overflow: 'auto' }}>
                <s-text tone="critical" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {error.message}
                </s-text>
              </s-box>
            )}
          </s-stack>
        </s-box>
      </s-section>
    </s-page>
  );
}
