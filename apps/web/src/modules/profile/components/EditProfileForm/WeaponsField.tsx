'use client'
import { Icon } from '@/modules/common/components/Icon'
import { Weapon } from '@/payload-types'
import {
  ActionIcon,
  Box,
  Button,
  Collapse,
  Group,
  Menu,
  NumberInput,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
} from '@mantine/core'
import { IconEdit, IconGripVertical, IconInfoCircle, IconPlus, IconX } from '@tabler/icons-react'
import React, { memo, useMemo, useState } from 'react'
import { useEditProfileFormContext } from '.'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  closestCorners,
} from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import cx from 'clsx'
import classes from './WeaponsField.module.css'
import { getWeaponById } from '@/modules/weapons/utils/getWeaponById'
import Image from 'next/image'
import ObjectId from 'bson-objectid'

interface WeaponsFieldProps {
  weapons: Weapon[]
  label: string
  addWeapon: string
  leadershipLabel: string
  leadershipDescription: string
  leadershipTip: string
  confirm: string
}

export const WeaponsField = ({
  weapons,
  label,
  addWeapon,
  leadershipLabel,
  leadershipDescription,
  leadershipTip,
  confirm,
}: WeaponsFieldProps) => {
  const form = useEditProfileFormContext()
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))
  const [editing, setEditing] = useState('')

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active?.id !== over?.id) {
      const oldIndex = form.getValues().weapons?.findIndex((item) => item.id === active.id)
      const newIndex = form.getValues().weapons?.findIndex((item) => item.id === over?.id)
      form.reorderListItem('weapons', { from: oldIndex || 0, to: newIndex || 0 })
    }
  }

  const formValues = form.getValues()

  const addableWeapons = useMemo(() => {
    const filteredWeapons = weapons.filter((weapon) => {
      return !formValues.weapons?.some((item) => item.weapon === weapon.id)
    })

    const newId = new ObjectId().toHexString()
    return filteredWeapons.map((weapon) => (
      <Menu.Item
        key={weapon.id}
        onClick={() => {
          const isWeaponPresent = formValues.weapons?.some((item) => item.weapon === weapon.id)
          if (!isWeaponPresent) {
            form.insertListItem('weapons', {
              id: newId,
              weapon: weapon.id,
              leadership: '',
            })
          }
          setEditing(newId)
        }}
        leftSection={
          <ThemeIcon variant="default" size="sm">
            {weapon?.icon &&
              typeof weapon?.icon === 'object' &&
              typeof weapon?.icon?.url === 'string' && (
                <Image
                  src={weapon.icon.url}
                  width={14}
                  height={14}
                  alt={weapon.name || ''}
                  style={{ objectFit: 'contain', userSelect: 'none' }}
                  draggable={false}
                  className={classes.weaponIcon}
                />
              )}
          </ThemeIcon>
        }
      >
        {weapon.name}
      </Menu.Item>
    ))
  }, [formValues.weapons, form, weapons])

  return (
    <>
      <Group justify="space-between" align="center">
        <Text fw={500}>{label}</Text>
        <Menu position="bottom-end">
          <Menu.Target>
            <Button
              variant="default"
              size="compact-sm"
              leftSection={<Icon icon={IconPlus} size="1rem" />}
            >
              {addWeapon}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{addWeapon}</Menu.Label>
            {addableWeapons}
          </Menu.Dropdown>
        </Menu>
      </Group>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={form.getValues().weapons?.map((weapon) => weapon.id) || []}
          strategy={verticalListSortingStrategy}
        >
          <Stack gap={'xs'} className={classes.dragContainer}>
            {form
              .getValues()
              .weapons?.map((item, index) => (
                <WeaponBlock
                  key={item.id}
                  item={item}
                  index={index}
                  weapon={getWeaponById(item.weapon, weapons)}
                  primary="Primary Weapon"
                  primaryId={form.getValues().weapons?.at(0)?.id || null}
                  editing={editing}
                  setEditing={setEditing}
                  leadershipLabel={leadershipLabel}
                  leadershipDescription={leadershipDescription}
                  leadershipTip={leadershipTip}
                  confirm={confirm}
                />
              ))}
          </Stack>
        </SortableContext>
      </DndContext>
    </>
  )
}
WeaponsField.displayName = 'WeaponsField'

const WeaponBlock = memo(
  ({
    item,
    index,
    weapon,
    primary,
    primaryId,
    editing,
    setEditing,
    leadershipLabel,
    leadershipDescription,
    leadershipTip,
    confirm,
  }: {
    item: { id: string; weapon: string; leadership?: number | null }
    index: number
    weapon: Weapon | null
    primary: string
    primaryId?: string | null
    editing: string
    setEditing: (id: string) => void
    leadershipLabel: string
    leadershipDescription: string
    leadershipTip: string
    confirm: string
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      setActivatorNodeRef,
      isDragging,
    } = useSortable({
      id: item.id,
      disabled: Boolean(editing),
    })

    const form = useEditProfileFormContext()

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 100 : undefined,
    }

    const handleEdit = () => {
      if (editing === item.id) {
        setEditing('')
      } else {
        setEditing(item.id)
      }
    }

    const handleDelete = () => {
      if (editing === item.id) {
        setEditing('')
      }
      form.removeListItem('weapons', index)
    }

    return (
      <Box key={item.id} className={cx(classes.item)} ref={setNodeRef} style={style}>
        <Stack gap={0} justify="flex-start">
          <Group gap="xs" mih={34} align="center">
            <ActionIcon
              ref={setActivatorNodeRef}
              {...attributes}
              {...listeners}
              variant="default"
              disabled={Boolean(editing)}
            >
              <Icon icon={IconGripVertical} size="1rem" className={classes.draggableIcon} />
            </ActionIcon>
            <Stack flex={1}>
              <Group justify="space-between">
                <Group gap="xs">
                  {weapon?.icon &&
                    typeof weapon?.icon === 'object' &&
                    typeof weapon?.icon?.url === 'string' && (
                      <Image
                        src={weapon.icon.url}
                        width={24}
                        height={24}
                        alt={weapon.name || ''}
                        style={{ objectFit: 'contain', userSelect: 'none' }}
                        draggable={false}
                        className={classes.weaponIcon}
                      />
                    )}

                  <Stack gap={0}>
                    <Text fw={500} size="sm">
                      {weapon?.name}
                    </Text>

                    <Text fw={600} fz={8} c="dimmed">
                      {primaryId === item.id && primary}
                      {primaryId === item.id && typeof item.leadership === 'number' && ' - '}
                      {typeof item.leadership === 'number' &&
                        `${item.leadership} ${leadershipLabel}`}
                    </Text>
                  </Stack>
                </Group>

                <Group gap={4}>
                  <ActionIcon variant="subtle" color="gray" onClick={handleEdit}>
                    <Icon icon={IconEdit} strokeWidth={1.5} size="1rem" />
                  </ActionIcon>
                  <ActionIcon variant="subtle" color="red" onClick={handleDelete}>
                    <Icon icon={IconX} strokeWidth={1.5} size="1rem" />
                  </ActionIcon>
                </Group>
              </Group>
            </Stack>
          </Group>
          <Collapse in={item.id === editing} pt="md">
            <Stack>
              <NumberInput
                label={
                  <Group gap={4}>
                    <Text fw={500} size="sm">
                      {leadershipLabel}
                    </Text>
                    <Tooltip label={leadershipTip} w={224} multiline>
                      <Icon icon={IconInfoCircle} size="0.8rem" />
                    </Tooltip>
                  </Group>
                }
                description={leadershipDescription}
                hideControls
                max={100}
                clampBehavior="strict"
                {...form.getInputProps(`weapons.${index}.leadership`)}
              />
              <Button size="xs" onClick={handleEdit} mr="auto" variant="light">
                {confirm}
              </Button>
            </Stack>
          </Collapse>
        </Stack>
      </Box>
    )
  },
)

WeaponBlock.displayName = 'WeaponBlock'
