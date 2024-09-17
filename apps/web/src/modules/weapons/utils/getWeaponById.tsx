import { Weapon } from '@/payload-types'

export const getWeaponById = (id: string, weapons: Weapon[]): Weapon | null => {
  return weapons.find((weapon) => weapon.id === id) || null
}
