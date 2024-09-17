import { createSelectors } from '@/utils/createSelectors'
import { create } from 'zustand'

interface LayoutState {
  navOpened: boolean
  toggleNav: () => void
  closeNav: () => void
  openNav: () => void
  openedNavLink: string
  setOpenedNavLink: (link: string) => void
  toggleOpenedNavLink: (link: string) => void
}

const useLayoutStoreBase = create<LayoutState>()((set) => ({
  navOpened: false,
  toggleNav: () => set((state) => ({ navOpened: !state.navOpened })),
  closeNav: () => set({ navOpened: false }),
  openNav: () => set({ navOpened: true }),
  openedNavLink: '',
  setOpenedNavLink: (link) => set({ openedNavLink: link }),
  toggleOpenedNavLink: (link) =>
    set((state) => ({ openedNavLink: state.openedNavLink === link ? '' : link })),
}))

export const useLayoutStore = createSelectors(useLayoutStoreBase)
