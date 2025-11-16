'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSun, faMoon, faGear } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/utilities/ui' // your existing cn helper

// Minimal Select primitives adjusted for a transparent, borderless look.
// (They're intentionally compact — only styling adjusted.)
const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const MinimalTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof SelectPrimitive.Trigger> & { compact?: boolean }
>(({ className, children, compact = false, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      {...props}
      className={cn(
        // transparent, no border, keep alignment and minimal spacing
        'flex items-center gap-2 px-1 py-1 text-inherit outline-none',
        // remove default background/border, but preserve focus ring
        'bg-transparent border-0 rounded-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        compact ? 'h-8' : 'h-10',
        className,
      )}
    >
      {children}
    </SelectPrimitive.Trigger>
  )
})

MinimalTrigger.displayName = 'MinimalTrigger'

const MinimalContent: React.FC<
  React.ComponentProps<typeof SelectPrimitive.Content> & { position?: 'popper' | 'item-aligned' }
> = ({ children, className, position = 'popper', ...props }) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      position={position}
      {...props}
      className={cn(
        // transparent container, no border, keep shadow/animation if you want it
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden bg-transparent border-0 shadow-none text-popover-foreground',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        className,
      )}
    >
      <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1">
        {/* keep small caret for scrolling if list overflow; you can hide if unwanted */}
        <span className="sr-only">Scroll up</span>
      </SelectPrimitive.ScrollUpButton>

      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>

      <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1">
        <span className="sr-only">Scroll down</span>
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
)

const MinimalItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SelectPrimitive.Item>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    {...props}
    className={cn(
      // transparent, no bg, no borders; only on hover change text color
      'relative flex w-full cursor-default select-none items-center gap-2 rounded py-1.5 pl-2 pr-2 text-sm outline-none',
      // default text inherits foreground; hover only changes color (per your request)
      'hover:text-coral-bright focus:text-coral-bright',
      // keep disabled style
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
  >
    {/* left area for check indicator; we hide visual stripes, using color instead */}
    <span className="absolute left-0 flex h-full items-center pl-1">
      <SelectPrimitive.ItemIndicator>
        <FontAwesomeIcon icon={faCheck} className="h-4 w-4 opacity-70" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <span className="pl-6">
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </span>
  </SelectPrimitive.Item>
))

MinimalItem.displayName = 'MinimalItem'

// --- ThemeSelector specific wrapper ---
// Icons: sun (light), moon (dark), gear (system/auto)
type ThemeValue = 'light' | 'dark' | 'system'

export interface ThemeSelectorProps {
  value?: ThemeValue
  onValueChange?: (v: ThemeValue) => void
  className?: string
  compact?: boolean
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  value: controlledValue,
  onValueChange,
  className,
  compact = false,
}) => {
  // controlled or uncontrolled internal state
  const [value, setValue] = React.useState<ThemeValue>(controlledValue ?? 'system')

  React.useEffect(() => {
    if (controlledValue !== undefined && controlledValue !== value) {
      setValue(controlledValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledValue])

  const handleChange = (v: string) => {
    const val = v as ThemeValue
    setValue(val)
    onValueChange?.(val)
  }

  // helper: icon & label mapping
  const iconFor = (v: ThemeValue) => (v === 'light' ? faSun : v === 'dark' ? faMoon : faGear)

  const labelFor = (v: ThemeValue) => (v === 'light' ? 'Light' : v === 'dark' ? 'Dark' : 'Auto')

  // Trigger icon classes:
  // - default: primary
  // - hover on trigger: coral-bright
  // - active (if selected) -> coral-mist (light) OR purple-twilight in dark mode
  // We apply conditional classes so the trigger icon reflects the selected theme (Option A)
  const triggerIconClass = (val: ThemeValue) =>
    cn(
      'h-5 w-5 transition-colors duration-150',
      // active mapping: when the trigger is showing the currently selected value
      value === val
        ? // active: coral-mist in light, purple-twilight in dark
          'text-coral-mist dark:text-purple-twilight'
        : // default icon color
          'text-primary',
      // on hover change color
      'group-hover:text-coral-bright',
    )

  return (
    <Select value={value} onValueChange={handleChange}>
      <MinimalTrigger className={cn('group', className)} compact={compact}>
        {/* Show the active icon (Option A) */}
        <span className="flex items-center">
          <FontAwesomeIcon icon={iconFor(value)} className={triggerIconClass(value)} />
        </span>
        {/* keep the SelectValue in DOM for accessibility but visually hidden */}
        <SelectValue className="sr-only">{labelFor(value)}</SelectValue>
      </MinimalTrigger>

      <MinimalContent>
        <SelectGroup>
          <MinimalItem value="light">
            <span className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faSun}
                className={cn(
                  'h-4 w-4',
                  // selected item uses the same active color logic
                  value === 'light' ? 'text-coral-mist dark:text-purple-twilight' : 'text-primary',
                )}
              />
              <span>Light</span>
            </span>
          </MinimalItem>

          <MinimalItem value="dark">
            <span className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faMoon}
                className={cn(
                  'h-4 w-4',
                  value === 'dark' ? 'text-coral-mist dark:text-purple-twilight' : 'text-primary',
                )}
              />
              <span>Dark</span>
            </span>
          </MinimalItem>

          <MinimalItem value="system">
            <span className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faGear}
                className={cn(
                  'h-4 w-4',
                  value === 'system' ? 'text-coral-mist dark:text-purple-twilight' : 'text-primary',
                )}
              />
              <span>Auto</span>
            </span>
          </MinimalItem>
        </SelectGroup>
      </MinimalContent>
    </Select>
  )
}

export default ThemeSelector

export {
  Select,
  SelectGroup,
  SelectValue,
  MinimalTrigger as SelectTrigger,
  MinimalContent as SelectContent,
  MinimalItem as SelectItem,
}
