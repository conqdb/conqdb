'use client'
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Drawer as MantineDrawer,
  ScrollAreaAutosize,
  Text,
} from '@mantine/core'
import React, { createContext, useContext } from 'react'
import classes from './index.module.css'
import { Icon } from '@/modules/common/components/Icon'
import { IconEdit } from '@tabler/icons-react'
import { EditProfileContext, useEditProfileFormContext } from '../EditProfileForm'

type ModalContextType = {
  opened: boolean
  open: () => void
  close: () => void
  toggle: () => void
  isPending: boolean
  setIsPending: (value: boolean) => void
}

export const DrawerContext = createContext<ModalContextType>({
  opened: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
  isPending: false,
  setIsPending: () => {},
})

export const Drawer = ({
  children,
  editProfile,
  save,
  cancel,
}: {
  children: React.ReactNode
  editProfile: string
  save: string
  cancel: string
}) => {
  const { opened, toggle, close, handleSubmit, isPending } = useContext(EditProfileContext)
  const form = useEditProfileFormContext()

  return (
    <>
      <Button
        variant="default"
        size="compact-sm"
        onClick={toggle}
        rightSection={<Icon icon={IconEdit} size="1.1rem" strokeWidth={2} />}
      >
        {editProfile}
      </Button>
      <MantineDrawer.Root
        opened={opened}
        onClose={close}
        position="right"
        scrollAreaComponent={ScrollAreaAutosize}
        keepMounted={false}
      >
        <MantineDrawer.Overlay />
        <MantineDrawer.Content>
          <MantineDrawer.Header>
            <MantineDrawer.Title>
              <Text fw={500}>{editProfile}</Text>
            </MantineDrawer.Title>
            <MantineDrawer.CloseButton />
          </MantineDrawer.Header>
          <Box component="form" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <MantineDrawer.Body className={classes.drawerBody}>{children}</MantineDrawer.Body>
            <Box className={classes.drawerFooter}>
              <Group>
                <Button variant="light" disabled={!form.isDirty()} type="submit">
                  {save}
                </Button>
                <Button variant="default" onClick={close}>
                  {cancel}
                </Button>
              </Group>
            </Box>
            {isPending && (
              <Box className={classes.overlay}>
                <LoadingOverlay visible={isPending} />
              </Box>
            )}
          </Box>
        </MantineDrawer.Content>
      </MantineDrawer.Root>
    </>
  )
}
