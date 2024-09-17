'use client'
import React from 'react'
import { BrandLogo } from '@/modules/common/components/BrandLogo'
import { Link } from '@/navigation'

export const HeaderLogo = () => {
  return <BrandLogo component={Link} href="/" h={{ base: '2rem', md: '2.42rem' }} />
}
