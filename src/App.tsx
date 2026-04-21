import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Toaster } from 'sonner';
import { PolarisErrorBoundary } from './components/polaris-error-boundary';
import { PolarisLoadingFallback } from './components/polaris-loading-fallback';
import { ShopifyGuard } from './components/ShopifyGuard';
import { ShopifyLayout } from './layouts/ShopifyLayout';

const InstallPage = lazy(() => import('@/pages/InstallPage').then((m) => ({ default: m.InstallPage })));
const OverviewPage = lazy(() => import('@/pages/OverviewPage').then((m) => ({ default: m.OverviewPage })));
const ActivityPage = lazy(() => import('@/pages/ActivityPage').then((m) => ({ default: m.ActivityPage })));
const ProductsPage = lazy(() => import('@/pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const InsightsPage = lazy(() => import('@/pages/InsightsPage').then((m) => ({ default: m.InsightsPage })));
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));

function renderLazyRoute(Component: LazyExoticComponent<ComponentType>) {
  return (
    <Suspense fallback={<PolarisLoadingFallback />}>
      <Component />
    </Suspense>
  );
}

function RedirectToOverview() {
  const search = window.location.search;
  return <Navigate to={`/overview${search}`} replace />;
}

export function App() {
  return (
    <PolarisErrorBoundary>
      <Routes>
        <Route path="/install" element={renderLazyRoute(InstallPage)} />

        <Route element={<ShopifyGuard />}>
          <Route element={<ShopifyLayout />}>
            <Route path="/overview" element={renderLazyRoute(OverviewPage)} />
            <Route path="/activity" element={renderLazyRoute(ActivityPage)} />
            <Route path="/products" element={renderLazyRoute(ProductsPage)} />
            <Route path="/insights" element={renderLazyRoute(InsightsPage)} />
            <Route path="/settings" element={renderLazyRoute(SettingsPage)} />
          </Route>
        </Route>

        <Route path="/" element={<RedirectToOverview />} />
        <Route path="*" element={<RedirectToOverview />} />
      </Routes>

      <Toaster position="bottom-right" />
    </PolarisErrorBoundary>
  );
}
