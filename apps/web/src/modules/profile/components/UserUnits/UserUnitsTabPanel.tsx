import { useTranslations } from 'next-intl'
import { ExpandedUserUnit } from '../../utils/defaultUserUnitSort'
import { SimpleGrid, TabsPanel } from '@mantine/core'
import { Suspense } from 'react'
import { NotFound } from '@/modules/common/components/NotFound'
import { UserHasNoUnits } from './UserHasNoUnits'
import { UserUnitCard } from '@/modules/units/components/UnitCard/UserUnitCard'

interface UserUnitsTabPanelProps {
  value: string
  data: ExpandedUserUnit[]
  userId: string
  canEdit?: boolean
}

export const UserUnitsTabPanel = ({
  value,
  data,
  userId,
  canEdit = false,
}: UserUnitsTabPanelProps) => {
  const t = useTranslations('common.responses')

  return (
    <TabsPanel value={value} py="md">
      {data.length === 0 ? (
        <Suspense fallback={<NotFound>{t('nothingFound')}</NotFound>}>
          <UserHasNoUnits userId={userId} />
        </Suspense>
      ) : (
        <SimpleGrid cols={{ base: 2, xs: 3, md: 4, lg: 5 }}>
          {data.map(
            (userUnit) =>
              typeof userUnit?.unit === 'object' && (
                <UserUnitCard
                  key={userUnit.id}
                  userUnit={userUnit}
                  userId={userId}
                  editable={canEdit}
                />
              ),
          )}
        </SimpleGrid>
      )}
    </TabsPanel>
  )
}
