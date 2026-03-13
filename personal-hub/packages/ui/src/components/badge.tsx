import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.18em] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-brand-teal/20 bg-brand-teal/10 text-brand-teal',
        secondary:
          'border-slate-200 bg-slate-100 text-slate-600',
        destructive:
          'border-red-200 bg-red-50 text-red-700 shadow-sm',
        outline: 'border-gray-200 text-foreground',
        success: 'border-green-100 bg-green-50 text-green-700',
        warning: 'border-amber-100 bg-amber-50 text-amber-700',
        info: 'border-blue-100 bg-blue-50 text-blue-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
