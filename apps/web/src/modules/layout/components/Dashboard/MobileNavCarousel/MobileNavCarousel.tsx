'use client'
import { Carousel } from '@mantine/carousel'
import React from 'react'
export const MobileNavCarousel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Carousel
      height={64}
      slideGap={4}
      align="start"
      slidesToScroll={1}
      slideSize="33.333333%"
      withControls={false}
      containScroll="keepSnaps"
    >
      {children}
    </Carousel>
  )
}
