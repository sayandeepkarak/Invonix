"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="scroll-area"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div className="h-full w-full overflow-auto scroll-smooth">
        {children}
      </div>
    </div>
  )
}
