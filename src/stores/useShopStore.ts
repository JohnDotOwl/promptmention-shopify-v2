import { create } from 'zustand';

interface ShopInfo {
  id: number;
  shop_domain: string;
  shop_name: string | null;
  email: string | null;
  plan: string | null;
  installed_at: string;
}

interface ShopStoreState {
  shop: ShopInfo | null;
  isLoading: boolean;
  isInstalled: boolean;
  setShop: (shop: ShopInfo | null) => void;
  setLoading: (loading: boolean) => void;
  setInstalled: (installed: boolean) => void;
  reset: () => void;
}

export const useShopStore = create<ShopStoreState>((set) => ({
  shop: null,
  isLoading: true,
  isInstalled: false,
  setShop: (shop) => set({ shop, isInstalled: !!shop }),
  setLoading: (isLoading) => set({ isLoading }),
  setInstalled: (isInstalled) => set({ isInstalled }),
  reset: () =>
    set({
      shop: null,
      isLoading: false,
      isInstalled: false,
    }),
}));
