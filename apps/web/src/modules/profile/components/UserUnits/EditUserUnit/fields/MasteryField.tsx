'use client'
import React, { useMemo, useRef } from 'react'
import { useEditUserUnitFormContext, useEditUserUnitStore } from '../EditUserUnitProvider'
import {
  Box,
  Button,
  Group,
  NumberInput,
  NumberInputHandlers,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { MAX_MASTERY_NODES } from '@/constants'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import classes from './MasteryField.module.css'
import { useAddUserUnitStore } from '../../AddUserUnit/addUserUnit.store'

export const MasteryField = ({ label, max }: { label: string; max: string }) => {
  const form = useEditUserUnitFormContext()
  const handlersRef = useRef<NumberInputHandlers>(null)
  const hasMastery = useEditUserUnitStore((state) => state.hasMastery)
  const masteryNodes = useEditUserUnitStore((state) => state.masteryNodes)

  const handleMax = () => {
    form.setFieldValue('masteryNodes', MAX_MASTERY_NODES)
  }

  return hasMastery ? (
    <Stack gap={4}>
      <Text size="sm" fw={500} lh={1.55}>
        {label}
      </Text>
      <Group gap={8}>
        <NumberInput
          {...form.getInputProps('masteryNodes')}
          allowNegative={false}
          max={masteryNodes}
          clampBehavior="strict"
          hideControls
          handlersRef={handlersRef}
          leftSection={
            <UnstyledButton
              className={classes.btn}
              onClick={() => handlersRef.current?.decrement()}
            >
              <Box className={classes.btnBg}>
                <IconMinus className={classes.icon} strokeWidth={1.5} />
              </Box>
            </UnstyledButton>
          }
          w={144}
          leftSectionWidth={36}
          rightSectionWidth={36}
          rightSection={
            <UnstyledButton
              className={classes.btn}
              onClick={() => handlersRef.current?.increment()}
            >
              <Box className={classes.btnBg}>
                <IconPlus className={classes.icon} strokeWidth={1.5} />
              </Box>
            </UnstyledButton>
          }
          styles={{
            input: {
              textAlign: 'center',
            },
          }}
        />
        <Button variant="default" onClick={handleMax}>
          Max
        </Button>
      </Group>
    </Stack>
  ) : null
}
