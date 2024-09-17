import React from 'react'
import classes from './index.module.css'
import { Avatar, Box, Flex, Group } from '@mantine/core'

export const ProfileAvatar = ({ url }: { url?: string | null }) => {
  return (
    <Box className={classes.avatarWrapper} px={{ base: 'md', xs: 'lg', lg: 'xl' }}>
      <Flex justify={{ base: 'center', xs: 'flex-start' }}>
        <Avatar src={url} size={92} className={classes.avatar}></Avatar>
      </Flex>
    </Box>
  )
}
