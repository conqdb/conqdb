import React from 'react'
import { EditUserUnitModal } from './EditUserUnitModal'
import { EditUserUnitProvider } from './EditUserUnitProvider'
import { ControlFields } from './fields/ControlFields'
import { useTranslations } from 'next-intl'
import { EditUserUnitForm } from './EditUserUnitForm'
import { Group, Stack, Text } from '@mantine/core'
import { StatusField } from './fields/StatusField'
import { FavouriteField } from './fields/FavouriteField'
import { HasLeadershipField } from './fields/HasLeadershipField'
import { MasteryField } from './fields/MasteryField'

interface EditUserUnitProps {
  children: React.ReactNode
}

export const EditUserUnit = ({ children }: EditUserUnitProps) => {
  const t = useTranslations('profile.units')
  const tc = useTranslations('common.actions')

  return (
    <EditUserUnitProvider>
      <EditUserUnitModal>
        <EditUserUnitForm>
          <Stack>
            <StatusField
              label={t('status')}
              status={{
                training: {
                  label: t('training.label'),
                  description: t('training.description'),
                },
                ready: { label: t('ready.label'), description: t('ready.description') },
                maxed: { label: t('maxed.label'), description: t('maxed.description') },
              }}
            />
            <Group>
              <FavouriteField label={t('favourite')} />
              <HasLeadershipField label={t('hasLeadershipDoc')} />
            </Group>
            <MasteryField label={t('unlockedMasteryNodes')} max={t('max')} />
            <ControlFields cancel={tc('cancel')} save={tc('save')} />
          </Stack>
        </EditUserUnitForm>
      </EditUserUnitModal>
      {children}
    </EditUserUnitProvider>
  )
}
{
  /* <EditUserUnitModal title={userUnit.unit.name}>
          <EditUserUnitForm>
            <Stack>
              <StatusField
                label={t('status')}
                status={{
                  training: {
                    label: t('training.label'),
                    description: t('training.description'),
                  },
                  ready: { label: t('ready.label'), description: t('ready.description') },
                  maxed: { label: t('maxed.label'), description: t('maxed.description') },
                }}
              />
              <Group>
                <FavouriteField label={t('favourite')} />
                <HasLeadershipField label={t('hasLeadershipDoc')} />
              </Group>
              <MasteryField label={t('unlockedMasteryNodes')} max={t('max')} />
              <Text c="dimmed" size="sm">
                Delete Unit
              </Text>
              <ControlFields cancel={tc('cancel')} save={tc('save')} />
            </Stack>
          </EditUserUnitForm>
        </EditUserUnitModal>
      </EditUserUnitProvider> */
}
