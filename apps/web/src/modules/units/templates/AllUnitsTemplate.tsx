'use client'
import { Unit } from '@/payload-types'
import { Container, Divider, SimpleGrid, Title } from '@mantine/core'
import React from 'react'
import { UnitCardDisplay } from '../components/UnitCard'
import { UnstyledButtonLink } from '@/modules/common/components/UnstyledButtonLink'

interface AllUnitsTemplateProps {
  units: Unit[]
}

export const AllUnitsTemplate = ({ units }: AllUnitsTemplateProps) => {
  return (
    <Container my="xl">
      <Title>Units</Title>
      <Divider my="md" />
      <SimpleGrid cols={{ base: 2, xs: 3, md: 4, lg: 6 }}>
        {Array.isArray(units) &&
          units.map((unit) => (
            <UnstyledButtonLink key={unit.id} href={`/units/${unit.slug}`}>
              <UnitCardDisplay unit={unit} style={{ cursor: 'pointer' }} />
            </UnstyledButtonLink>
          ))}
      </SimpleGrid>
    </Container>
  )
}
