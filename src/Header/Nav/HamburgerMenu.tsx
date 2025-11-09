'use client'

import { useState } from 'react'
import Hamburger from 'hamburger-react'
import { CMSLink } from '@/components/Link'
import type { Header } from '@/payload-types'

interface HamburgerMenuProps {
  navItems: NonNullable<Header['navItems']>
}

export default function HamburgerMenu({ navItems }: HamburgerMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <Hamburger size={18} toggled={open} toggle={setOpen} />

      {open && (
        <div className="fixed top-0 left-0 w-3/4 h-screen p-4 bg-secondary text-primary z-40">
          <nav className="flex flex-col gap-4 mt-2">
            <Hamburger size={18} toggled={open} toggle={setOpen} />
            {navItems.map(({ link }, i) => (
              <CMSLink key={i} {...link} appearance="link" />
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
