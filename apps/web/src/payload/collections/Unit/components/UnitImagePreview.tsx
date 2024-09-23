'use client'
import React, { useEffect, useState } from 'react'
import { useFormFields } from '@payloadcms/ui'
import * as qs from 'qs-esm'
import './index.scss'
type Props = {
  serverURL: string
}

export const UnitImagePreview = ({ serverURL }: Props) => {
  const { value: imageId } = useFormFields(([fields]) => fields.image)
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchUrl = async () => {
      const query = {
        depth: 0,
        draft: true,
        id: imageId,
      }

      const response = await fetch(`${serverURL}/api/media`, {
        body: qs.stringify(query),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-HTTP-Method-Override': 'GET',
        },
        method: 'POST',
      })

      if (response.ok) {
        const json = await response.json()
        const string = json.docs[0]?.url
        setUrl(string)
      } else {
        setUrl(null)
      }
    }

    if (imageId && typeof imageId === 'string') {
      fetchUrl()
    } else {
      setUrl(null)
    }
  }, [imageId, setUrl])

  const { value: x } = useFormFields(([fields]) => fields['imageSettings.x'])
  const { value: y } = useFormFields(([fields]) => fields['imageSettings.y'])
  const { value: scale } = useFormFields(([fields]) => fields['imageSettings.scale'])

  return (
    url && (
      <div className="unit-image-preview">
        <div className="field-label">Preview</div>
        <div className="unit-image-preview__card">
          <img
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
