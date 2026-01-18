"use client"

import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useUIStrings } from "@/components/providers/ui-strings-provider"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  const uiStrings = useUIStrings()
  return (
    <Loader2Icon
      role="status"
      aria-label={uiStrings?.spinnerLoadingLabel ?? 'Loading'}
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
