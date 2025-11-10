'use client'

import { useEffect, useState } from 'react'
import Hamburger from 'hamburger-react'
import { CMSLink } from '@/components/Link'
import type { Header } from '@/payload-types'

interface HamburgerMenuProps {
  navItems: NonNullable<Header['navItems']>
}

export default function HamburgerMenu({ navItems }: HamburgerMenuProps) {
  const [open, setOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Handle mount/unmount for exit animation
  useEffect(() => {
    if (open) setIsVisible(true)
  }, [open])

  const handleAnimationEnd = () => {
    if (!open) setIsVisible(false)
  }

  return (
    <>
      {/* Hamburger button */}
      <div className="fixed top-6 right-6 z-50 rounded-md p-2 lg:hidden">
        <Hamburger size={18} toggled={open} toggle={setOpen} />
      </div>

      {/* Menu dropdown */}
      {isVisible && (
        <div
          className={`fixed top-4 right-4 bottom-4 w-3/4 max-w-sm p-6 z-40 shadow-2xl backdrop-blur-xl bg-secondary/80 border-l border-primary/10 rounded-2xl
            ${open ? 'animate-slide-in' : 'animate-slide-out'}`}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className="h-12"></div>

          <nav className="flex flex-col gap-4">
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                onClick={() => setOpen(false)} // ✅ Now valid
              />
            ))}
          </nav>
        </div>
      )}

      {/* Backdrop */}
      {isVisible && (
        <div
          className={`fixed inset-0 bg-black/50 z-30 ${
            open ? 'animate-fade-in' : 'animate-fade-out'
          }`}
          onClick={() => setOpen(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setOpen(false)
          }}
          aria-label="Close menu"
          onAnimationEnd={handleAnimationEnd}
        />
      )}

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

        @keyframes slide-out {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
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

        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }

        .animate-slide-out {
          animation: slide-out 0.3s ease-in forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-fade-out {
          animation: fade-out 0.3s ease-in forwards;
        }
      `}</style>
    </>
  )
}
