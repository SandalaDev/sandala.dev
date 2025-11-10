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
      <div className="fixed top-6 right-6 z-50  rounded-md p-2 lg:hidden">
        <Hamburger size={18} toggled={open} toggle={setOpen} />
      </div>

      {/* Menu dropdown - positioned top-right, outside header flow */}
      {open && (
        <div className="fixed top-4 right-4 bottom-4 w-3/4 max-w-sm p-6 z-40 shadow-2xl backdrop-blur-xl bg-secondary/80 border-l border-primary/10 rounded-2xl animate-slide-in">
          {/* This hamburger is now hidden since the main one is always visible */}
          <div className="h-12"></div>

          <nav className="flex flex-col gap-4">
            {navItems.map(({ link }, i) => (
              <CMSLink key={i} {...link} appearance="link" onClick={() => setOpen(false)} />
            ))}
          </nav>
        </div>
      )}

      {/* Backdrop overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 animate-fade-in"
          onClick={() => setOpen(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setOpen(false)
            }
          }}
          aria-label="Close menu"
        />
      )}

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
