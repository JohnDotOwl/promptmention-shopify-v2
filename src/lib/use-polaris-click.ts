import { useEffect, useRef } from 'react';

export function usePolarisClick<T extends HTMLElement>(handler: (() => void) | undefined) {
  const ref = useRef<T>(null);
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const listener = () => handlerRef.current?.();
    el.addEventListener('click', listener);
    return () => el.removeEventListener('click', listener);
  }, []);

  return ref;
}
