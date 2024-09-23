'use client'
import React, { useEffect, useState } from 'react'
import { useFormFields } from '@payloadcms/ui'
import './index.scss'
type Props = {
  serverURL: string
}

export const UnitImagePreview = ({ serverURL }: Props) => {
  const image = useFormFields(([fields]) => fields.image)
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchUrl = async () => {
      const response = await fetch(`${serverURL}/api/media/${image.value}?draft=true&depth=0`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'GET',
      })

      if (response.ok) {
        const json = await response.json()
        const string = json.url
        setUrl(string)
      } else {
        setUrl(null)
      }
    }

    if (image.value && typeof image.value === 'string') {
      fetchUrl()
    } else {
      setUrl(null)
    }
    return () => setUrl(null)
  }, [image, setUrl, serverURL])

  const { value: x } = useFormFields(([fields]) => fields['imageSettings.x'])
  const { value: y } = useFormFields(([fields]) => fields['imageSettings.y'])
  const { value: scale } = useFormFields(([fields]) => fields['imageSettings.scale'])

  return (
    url && (
      <div className="unit-image-preview">
        <div className="field-label">Preview</div>
        <div className="unit-image-preview__card">
          <img
            key={image.value as string}
            src={url}
            className="unit-image-preview__image"
            style={{ transform: `translateX(${x}%) translateY(${y}%) scale(${scale})` }}
            draggable={false}
            alt="preview"
          />
        </div>
      </div>
    )
  )
}
