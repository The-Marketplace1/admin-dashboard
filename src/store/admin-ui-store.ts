import { create } from 'zustand';

type AdminUiState = {
  mobileNavigationOpen: boolean;
  setMobileNavigationOpen: (open: boolean) => void;
};

export const useAdminUiStore = create<AdminUiState>((set) => ({
  mobileNavigationOpen: false,
  setMobileNavigationOpen: (open) => set({ mobileNavigationOpen: open }),
}));
