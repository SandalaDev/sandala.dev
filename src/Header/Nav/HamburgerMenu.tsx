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
    <>
      {/* Hamburger button - fixed top-right */}
      <div className="fixed top-6 right-6 z-50  rounded-md p-2">
        <Hamburger size={18} toggled={open} toggle={setOpen} />
      </div>

      {/* Menu dropdown - positioned top-right, outside header flow */}
      {open && (
        <div className="fixed top-0 right-0 w-3/4 max-w-sm h-screen p-6 z-40 shadow-2xl backdrop-blur-xl bg-secondary/35 border-l border-primary/10">
          {/* This hamburger is now hidden since the main one is always visible */}
          <div className="h-12"></div>

          <nav className="flex flex-col gap-4">
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                onClick={() => setOpen(false)} // Close menu on link click
              />
            ))}
          </nav>
        </div>
      )}

      {/* Backdrop overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setOpen(false)} />}
    </>
  )
}
