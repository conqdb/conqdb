import { validateRequest } from '@/lib/lucia'
import React from 'react'

export const RenderIfSelf = async ({
  userId,
  children,
}: {
  userId: string
  children: React.ReactNode
}) => {
  const req = await validateRequest()
  if (req.user && req.user.id === userId) {
    return children
  } else {
    return null
  }
}
