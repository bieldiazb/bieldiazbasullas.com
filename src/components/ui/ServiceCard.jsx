'use client'

import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function ServiceCard({ title, description }) {
  const cardRef = useRef(null)
  const blobRef = useRef(null)

  const onMove = (e) => {
    const card = cardRef.current
    const blob = blobRef.current
    if (!card || !blob) return

    const rect = card.getBoundingClientRect()

    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    blob.style.transform = `translate(${x}px, ${y}px)`
    blob.style.opacity = "1"
  }

  const onLeave = () => {
    if (!blobRef.current) return
    blobRef.current.style.opacity = "0"
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="
        relative overflow-hidden rounded-2xl
        border border-border
        bg-background
        transition-colors duration-300
        hover:bg-muted/40
      "
    >
      {/* Glow */}
      <div
        ref={blobRef}
        className="
          pointer-events-none
          absolute top-1/2 left-1/2
          size-40 -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-primary/30
          blur-3xl
          opacity-0
          transition-opacity duration-300
        "
      />

      {/* Content */}
      <Card className="relative z-10 border-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
