import { useState } from "react"
import { cn } from "@/lib/utils"

export default function ServiceItem({ title, description, isActive, onHover }) {
  return (
    <div
      onMouseEnter={onHover}
      className={cn(
        "group cursor-default border-b border-border py-10 transition-colors duration-300",
        isActive && "text-foreground"
      )}
    >
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Title */}
        <h3
          className={cn(
            "col-span-12 md:col-span-6 text-3xl font-medium transition-all duration-300",
            isActive ? "opacity-100" : "opacity-70"
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <div
          className={cn(
            "col-span-12 md:col-span-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
            isActive
              ? "max-h-40 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 translate-y-2"
          )}
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
