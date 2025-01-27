import * as React from "react"

import { cn } from "@/lib/utils"
import { Raleway } from "next/font/google";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

  const RalewayFont = Raleway({
    subsets: ["latin"],
    weight: ["700"],
  });

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background my-0.5 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50",
          className,
          RalewayFont.className
        )}
        ref={ref}
        {...props}
      />
    );
  }
)
Input.displayName = "Input"

export { Input }
