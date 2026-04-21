import { useEffect, useRef } from 'react';

export function usePolarisChange<T extends HTMLElement>(handler: ((value: string) => void) | undefined) {
  const ref = useRef<T>(null);
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const listener = (event: Event) => {
      const target = event.currentTarget as HTMLElement & { value?: string };
      handlerRef.current?.(target.value ?? '');
    };

    el.addEventListener('change', listener);
    return () => el.removeEventListener('change', listener);
  }, []);

  return ref;
}
