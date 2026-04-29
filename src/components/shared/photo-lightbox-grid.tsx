'use client'

import { useState } from 'react'
import { ContentImage } from '@/components/shared/content-image'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

export function PhotoLightboxGrid({
  images,
  title,
}: {
  images: string[]
  title: string
}) {
  const [activeImage, setActiveImage] = useState<string | null>(null)

  if (!images.length) return null

  return (
    <>
      <div className="mt-5">
        <h3 className="text-3xl font-semibold tracking-[-0.03em] text-slate-800">Photos</h3>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(image)}
              className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-300 bg-slate-100 transition hover:opacity-90"
            >
              <ContentImage
                src={image}
                alt={`${title} photo ${index + 1}`}
                fill
                className="object-cover"
                intrinsicWidth={960}
                intrinsicHeight={720}
              />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeImage)} onOpenChange={(open) => !open && setActiveImage(null)}>
        <DialogContent className="max-w-4xl border-slate-300 bg-white p-3 sm:p-4">
          <DialogTitle className="sr-only">{title} photo</DialogTitle>
          {activeImage ? (
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-slate-100">
              <ContentImage
                src={activeImage}
                alt={`${title} preview`}
                fill
                className="object-contain"
                intrinsicWidth={1600}
                intrinsicHeight={1000}
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
