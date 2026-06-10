"use client"

import { ArrowLeft, type IconProps } from "@phosphor-icons/react"

export function Icon({ name, ...props }: { name: "ArrowLeft" } & IconProps) {
  if (name === "ArrowLeft") return <ArrowLeft {...props} />
  return null
}
