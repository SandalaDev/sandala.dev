import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 button-hover-animate min-w-[25%]',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-11 rounded-2xl px-8',
        sm: 'h-9 rounded-2xl px-3',
      },
      variant: {
        default:
          'butt-shadow bg-gradient-to-r from-[hsl(var(--purple-void))] to-[hsl(var(--coral-bright))] via-[hsl(var(--purple-base))] text-secondary hover:from-[hsl(var(--purple-void))] hover:to-[hsl(var(--coral-bright))] hover:via-[hsl(var(--purple-dusk))] dark:text-primary',
        destructive: 'bg-destructive text-secondary hover:bg-destructive/90',
        ghost: 'text-secondary hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 min-w-0',
        outline:
          'border-2 rounded-2xl bg-transparent text-primary border-[hsl(var(--coral-pink))] ' +
          'hover:text-[hsl(var(--purple-dusk))] hover:border-[hsl(var(--coral-pink))] hover:bg-transparent ' +
          'dark:text-[hsl(var(--coral-pink))] dark:border-[hsl(var(--coral-bright))] dark:hover:border-[hsl(var(--coral-blush))] dark:hover:bg-transparent',

        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:border border-[hsl(var(--coral-blush))  ]',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
}

export { Button, buttonVariants }
