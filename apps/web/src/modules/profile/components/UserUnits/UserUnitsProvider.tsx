'use client'
import { Unit, UserUnit } from '@/payload-types'
import { createStore, useStore } from 'zustand'
import { ExpandedUserUnit } from '../../utils/defaultUserUnitSort'
import { createContext, PropsWithChildren, useContext, useRef } from 'react'

interface UserUnitsProviderProps {
  userUnits: {
    melee: ExpandedUserUnit[]
    ranged: ExpandedUserUnit[]
    cavalry: ExpandedUserUnit[]
  }
}

interface UserUnitsState {
  units: Unit[]
  userUnits: UserUnit[]
  groupedUnits: {
    melee: Unit[]
    ranged: Unit[]
    cavalry: Unit[]
  }
  groupedUserUnits: {
    melee: ExpandedUserUnit[]
    ranged: ExpandedUserUnit[]
    cavalry: ExpandedUserUnit[]
  }
  hideOwned: boolean
  setHideOwned: (value: boolean) => void
}

type UserUnitsStore = ReturnType<typeof createUserUnitsStore>

const createUserUnitsStore = (props?: UserUnitsProviderProps) => {
  return createStore<UserUnitsState>()((set) => ({
    units: [],
    userUnits: [],
    groupedUnits: {
      melee: [],
      ranged: [],
      cavalry: [],
    },
    groupedUserUnits: props?.userUnits ?? { melee: [], ranged: [], cavalry: [] },
    hideOwned: true,
    setHideOwned: (hide) =>
      set((state) => {
        return {
          hideOwned: hide,
        }
      }),
  }))
}

export const UserUnitsContext = createContext<UserUnitsStore | null>(null)

export const UserUnitsProvider = ({
  children,
  userUnits,
}: PropsWithChildren<UserUnitsProviderProps>) => {
  const storeRef = useRef<UserUnitsStore>(null)

  if (!storeRef.current) {
    storeRef.current = createUserUnitsStore({ userUnits })
  }

  return <UserUnitsContext value={storeRef.current}>{children}</UserUnitsContext>
}

export function useUserUnitsContext<T>(selector: (state: UserUnitsState) => T): T {
  const store = useContext(UserUnitsContext)

  if (!store) throw new Error('Missing UserUnitsProvider in the tree...')

  return useStore(store, selector)
}
