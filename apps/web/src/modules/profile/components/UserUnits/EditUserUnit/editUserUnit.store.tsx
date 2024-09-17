import { createStore } from 'zustand'

export type EditUserUnitState = {
  modalOpened: boolean
  isPending: boolean
  currentTitle: string
}

export type EditUserUnitActions = {
  toggleModal: () => void
  closeModal: () => void
  setIsPending: (value: boolean) => void
  setCurrentTitle: (value: string) => void
}

export type EditUserUnitStore = EditUserUnitState & EditUserUnitActions

export const defaultInitState: EditUserUnitState = {
  modalOpened: false,
  isPending: false,
  currentTitle: '',
}

export const createEditUserUnitStore = (initState: EditUserUnitState = defaultInitState) => {
  return createStore<EditUserUnitStore>()((set) => ({
    ...initState,
    toggleModal: () => set((state) => ({ modalOpened: !state.modalOpened })),
    closeModal: () => set({ modalOpened: false }),
    setIsPending: (value) => set({ isPending: value }),
    setCurrentTitle: (value) => set({ currentTitle: value }),
  }))
}
