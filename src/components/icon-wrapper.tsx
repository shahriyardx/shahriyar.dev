"use client"

import { ArrowLeft, Envelope, MapPin, Globe, type IconProps } from "@phosphor-icons/react"

const icons = { ArrowLeft, Envelope, MapPin, Globe } as const

export function Icon({ name, ...props }: { name: keyof typeof icons } & IconProps) {
  const Component = icons[name]
  return Component ? <Component {...props} /> : null
}
