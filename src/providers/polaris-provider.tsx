import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface PolarisContextValue {
  isLoaded: boolean;
}

const PolarisContext = createContext<PolarisContextValue>({ isLoaded: false });

export function usePolaris() {
  return useContext(PolarisContext);
}

export function PolarisProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as Window & { __POLARIS__?: unknown }).__POLARIS__) {
      setIsLoaded(true);
      return;
    }

    const checkLoaded = () => {
      if (typeof window !== 'undefined' && (window as Window & { __POLARIS__?: unknown }).__POLARIS__) {
        setIsLoaded(true);
      }
    };

    checkLoaded();
    const timer = setTimeout(checkLoaded, 100);
    const backupTimer = setTimeout(checkLoaded, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(backupTimer);
    };
  }, []);

  return <PolarisContext.Provider value={{ isLoaded }}>{children}</PolarisContext.Provider>;
}
