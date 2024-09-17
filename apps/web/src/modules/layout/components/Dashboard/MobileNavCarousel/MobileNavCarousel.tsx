'use client'
import { Carousel, Embla } from '@mantine/carousel'
import React, { useCallback, useEffect, useState } from 'react'
export const MobileNavCarousel = ({ children }: { children: React.ReactNode }) => {
  const [embla, setEmbla] = useState<Embla | null>(null)
  const [slides, setSlides] = useState(3)

  const handleSetSlides = useCallback(() => {
    console.log('handleSetSlides Called')
    if (!embla) return
    setSlides(embla?.slideNodes?.length)
  }, [embla, slides, setSlides])

  useEffect(() => {
    if (!embla) {
      console.log('no embla...')
      return
    }

    embla.on('init', handleSetSlides)

    return () => {
      if (embla) {
        embla.off('init', handleSetSlides)
      }
    }
  }, [embla, handleSetSlides])

  console.log(slides)

  return (
    <Carousel
      height={64}
      slideGap={4}
      align="start"
      slidesToScroll={1}
      slideSize="33.333333%"
      withControls={false}
      containScroll="keepSnaps"
      draggable={Boolean(slides > 3)}
      getEmblaApi={setEmbla}
    >
      {children}
    </Carousel>
  )
}
