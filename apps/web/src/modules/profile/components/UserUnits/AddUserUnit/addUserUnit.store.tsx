import { Unit } from '@/payload-types'
import { createSelectors } from '@/utils/createSelectors'
import { create } from 'zustand'

export type AddUserUnitState = {
  hideOwned: boolean
  addUnitsOpened: boolean
  addUnitOpened: boolean
  isPending: boolean
  currentTitle: string
  currentUnit: Unit | null
}

export type AddUserUnitActions = {
  setHideOwned: (value: boolean) => void
  openAddUnits: () => void
  closeAddUnits: () => void
  openAddUnit: () => void
  closeAddUnit: () => void
  setIsPending: (value: boolean) => void
  setCurrentUnit: (unit: Unit) => void
}

export type AddUserUnitStore = AddUserUnitState & AddUserUnitActions

const useAddUserUnitStoreBase = create<AddUserUnitStore>()((set) => ({
  hideOwned: true,
  addUnitsOpened: false,
  addUnitOpened: false,
  isPending: false,
  currentTitle: '',
  currentUnit: null,
  setHideOwned: (hide) => set({ hideOwned: hide }),
  openAddUnits: () => set({ addUnitsOpened: true }),
  closeAddUnits: () => set({ addUnitsOpened: false }),
  openAddUnit: () => set({ addUnitOpened: true }),
  closeAddUnit: () => set({ addUnitOpened: false }),
  setIsPending: (value) => set({ isPending: value }),
  setCurrentUnit: (value) => set({ currentUnit: value }),
}))

export const useAddUserUnitStore = createSelectors(useAddUserUnitStoreBase)
