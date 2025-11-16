'use client'

import React from 'react'
import { faCog, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { cn } from '@/utilities/ui'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'

import type { Theme } from './types'
import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

type Mode = Theme | 'auto'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = React.useState<Mode>('auto')

  const onThemeChange = (themeToSet: Mode) => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = (window.localStorage.getItem(themeLocalStorageKey) as Mode) ?? 'auto'
    setValue(preference)
  }, [])

  const iconClass = 'w-5 h-5'

  const ActiveIcon = () => {
    switch (value) {
      case 'light':
        return <FontAwesomeIcon icon={faSun} className={iconClass} />
      case 'dark':
        return <FontAwesomeIcon icon={faMoon} className={iconClass} />
      default:
        return <FontAwesomeIcon icon={faCog} className={iconClass} />
    }
  }

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger
        aria-label="Select a theme"
        hideIcon
        variant="unstyled"
        className={cn(
          'w-auto h-10 bg-transparent gap-2 px-2 py-1 shadow-none text-foreground/70 hover:text-coral-bright transition-all duration-300 hover:-translate-y-1',
        )}
      >
        {/* Only the active theme icon is visible in the trigger */}
        <span className="inline-flex items-center">
          <ActiveIcon />
        </span>
      </SelectTrigger>
      <SelectContent className="border-0">
        <SelectItem value="auto">
          <span className="inline-flex items-center gap-2">
            <FontAwesomeIcon icon={faCog} className={iconClass} />
            <span>Auto</span>
          </span>
        </SelectItem>
        <SelectItem value="light">
          <span className="inline-flex items-center gap-2">
            <FontAwesomeIcon icon={faSun} className={iconClass} />
            <span>Light</span>
          </span>
        </SelectItem>
        <SelectItem value="dark">
          <span className="inline-flex items-center gap-2">
            <FontAwesomeIcon icon={faMoon} className={iconClass} />
            <span>Dark</span>
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
