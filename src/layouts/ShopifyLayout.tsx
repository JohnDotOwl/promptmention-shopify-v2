import { Outlet } from 'react-router';
import { ShopifyNavMenu } from '@/components/shopify-nav-menu';
import { useShopStore } from '@/stores/useShopStore';

export function ShopifyLayout() {
  const shop = useShopStore((state) => state.shop);

  return (
    <>
      <ShopifyNavMenu />
      <main style={{ paddingTop: 'var(--p-space-400)' }}>
        <Outlet />
      </main>
      {import.meta.env.DEV && shop?.shop_name && (
        <div
          style={{
            position: 'fixed',
            right: 'var(--p-space-200)',
            bottom: 'var(--p-space-200)',
            zIndex: 9999,
            borderRadius: 'var(--p-border-radius-100)',
            background: 'var(--p-color-bg-subdued)',
            padding: 'var(--p-space-100) var(--p-space-200)',
            fontSize: 'var(--p-font-size-75)',
            color: 'var(--p-color-text-subdued)',
          }}
        >
          Shop: {shop.shop_name}
        </div>
      )}
    </>
  );
}
