import { Unit, UnitType, User, UserUnit } from '@/payload-types'
import { Container } from '@mantine/core'
import React from 'react'
import { UserProfile } from '../components/UserProfile'
import { UserUnits } from '../components/UserUnits'
import { ExpandedUserUnit } from '../utils/defaultUserUnitSort'

interface UserProfileTemplateProps {
  user: User
  // units: Unit[]
  unitTypes: UnitType[]
  // userUnits: UserUnit[]
  userUnits: {
    melee: ExpandedUserUnit[]
    ranged: ExpandedUserUnit[]
    cavalry: ExpandedUserUnit[]
  }
}

export const UserProfileTemplate: React.FC<UserProfileTemplateProps> = ({
  user,
  unitTypes,
  userUnits,
}) => {
  return (
    <Container py="md" size="md">
      <UserProfile user={user} />
      <UserUnits userId={user.id} unitTypes={unitTypes} userUnits={userUnits} />
    </Container>
  )
}
