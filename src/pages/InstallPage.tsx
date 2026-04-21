import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { isEmbedded } from '@/lib/shopify';
import { usePolarisChange } from '@/lib/use-polaris-change';
import { usePolarisClick } from '@/lib/use-polaris-click';

export function InstallPage() {
  const [searchParams] = useSearchParams();
  const [shopInput, setShopInput] = useState('');
  const embedded = isEmbedded();

  useEffect(() => {
    const shop = searchParams.get('shop');
    if (!shop) return;

    const shopDomain = shop.includes('.myshopify.com') ? shop : `${shop}.myshopify.com`;
    window.location.href = `/api/shopify/install?shop=${encodeURIComponent(shopDomain)}`;
  }, [searchParams]);

  const handleSubmit = useCallback(() => {
    if (!shopInput) return;
    const shopDomain = shopInput.includes('.myshopify.com') ? shopInput : `${shopInput}.myshopify.com`;
    window.location.href = `/api/shopify/install?shop=${encodeURIComponent(shopDomain)}`;
  }, [shopInput]);

  const inputRef = usePolarisChange<HTMLElement>(setShopInput);
  const submitRef = usePolarisClick<HTMLElement>(handleSubmit);

  if (embedded) {
    return (
      <s-page heading="Installing PromptMention">
        <s-section>
          <s-box padding="large" background="subdued" borderRadius="large-200" style={{ display: 'flex', minHeight: '50vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <s-stack gap="base" alignItems="center" inlineAlign="center">
              <s-spinner size="large" />
              <s-text type="strong">Completing installation</s-text>
              <s-text color="subdued">We’re redirecting you to finish connecting your store.</s-text>
            </s-stack>
          </s-box>
        </s-section>
      </s-page>
    );
  }

  return (
    <s-page heading="Install PromptMention">
      <s-section>
        <s-box padding="large" background="subdued" borderRadius="large-200" maxInlineSize={520} style={{ margin: '0 auto' }}>
          <s-stack gap="large" alignItems="center" inlineAlign="center">
            <s-stack gap="small-200" alignItems="center" inlineAlign="center">
              <s-text type="strong" style={{ fontSize: '1.5rem' }}>
                Connect your Shopify store
              </s-text>
              <s-paragraph color="subdued" style={{ textAlign: 'center' }}>
                PromptMention will connect to your store, gather your catalog data, and build a useful AI visibility overview for your team.
              </s-paragraph>
            </s-stack>

            <s-stack gap="base" inlineSize="fill">
              <s-text-field ref={inputRef} label="Store domain" placeholder="your-store.myshopify.com" type="text" value={shopInput} />
              <s-button ref={submitRef} variant="primary" inlineSize="fill" disabled={!shopInput.trim()}>
                Install app
              </s-button>
            </s-stack>
          </s-stack>
        </s-box>
      </s-section>
    </s-page>
  );
}
