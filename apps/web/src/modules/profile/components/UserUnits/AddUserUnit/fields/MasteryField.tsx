'use client'
import React, { useCallback, useMemo, useRef } from 'react'
import { useAddUserUnitFormContext } from '../AddUserUnitProvider'
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
import { useAddUserUnitStore } from '../addUserUnit.store'

export const MasteryField = ({ label, max }: { label: string; max: string }) => {
  const form = useAddUserUnitFormContext()
  const handlersRef = useRef<NumberInputHandlers>(null)
  const currentUnit = useAddUserUnitStore((state) => state.currentUnit)

  const [hasMastery, maxMasteryNodes] = useMemo(() => {
    const nodesLength = currentUnit?.mastery?.nodes?.length
    return [
      Boolean(currentUnit?.mastery?.hasMastery),
      nodesLength && nodesLength > 0 ? nodesLength : MAX_MASTERY_NODES,
    ]
  }, [currentUnit])

  const handleMax = useCallback(() => {
    console.log(`handleMax called with amount ${maxMasteryNodes}`)
    form.setFieldValue('masteryNodes', maxMasteryNodes)
  }, [form, maxMasteryNodes])

  return hasMastery ? (
    <Stack gap={4}>
      <Text size="sm" fw={500} lh={1.55}>
        {label}
      </Text>
      <Group gap={8}>
        <NumberInput
          allowNegative={false}
          max={
            Array.isArray(currentUnit?.mastery?.nodes) && currentUnit?.mastery?.nodes?.length > 0
              ? currentUnit?.mastery?.nodes?.length
              : MAX_MASTERY_NODES
          }
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
          {...form.getInputProps('masteryNodes')}
        />
        <Button variant="default" onClick={handleMax}>
          {max}
        </Button>
      </Group>
    </Stack>
  ) : null
}
