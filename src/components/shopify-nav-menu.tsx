import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { usePolarisClick } from '@/lib/use-polaris-click';

const NAV_ITEMS = [
  { label: 'Overview', path: '/overview' },
  { label: 'Activity', path: '/activity' },
  { label: 'Products', path: '/products' },
  { label: 'Insights', path: '/insights' },
  { label: 'Settings', path: '/settings' },
];

export function ShopifyNavMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleNavigate = (event: Event) => {
      const target = event.target as HTMLElement;
      const href = target?.getAttribute('href') ?? target?.getAttribute('data-href');
      if (href && !href.startsWith('javascript:') && !href.startsWith('http')) {
        event.preventDefault();
        navigate(href);
      }
    };

    document.addEventListener('shopify:navigate', handleNavigate);
    return () => document.removeEventListener('shopify:navigate', handleNavigate);
  }, [navigate]);

  return (
    <s-app-nav>
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.path} href={item.path} isActive={location.pathname === item.path}>
          {item.label}
        </NavLink>
      ))}
    </s-app-nav>
  );
}

function NavLink({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) {
  const ref = usePolarisClick<HTMLElement>(() => {
    ref.current?.dispatchEvent(new CustomEvent('shopify:navigate', { bubbles: true }));
  });

  return (
    <s-link ref={ref} href={href} data-href={href} aria-current={isActive ? 'page' : undefined} style={isActive ? { fontWeight: 600 } : undefined}>
      {children}
    </s-link>
  );
}
