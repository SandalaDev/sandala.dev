'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import HamburgerMenu from '@/Header/Nav/HamburgerMenu'
import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const navItems = data?.navItems || []

  const pathname = usePathname()

  return (
    <>
      {/* Desktop Header */}
      <header className="container relative z-20 mt-[-0.25rem] shadow-card header-glass hidden lg:block">
        <div className="py-8 flex justify-between">
          <Link href="/">
            <Logo loading="eager" priority="high" className="" />
          </Link>
          <HeaderNav data={data} />
        </div>
      </header>

      {/* Mobile/Tablet - Hamburger & Logo */}
      <div className="lg:hidden">
        {/* Logo - fixed top-left */}
        <Link href="/" className="fixed top-6 left-6 z-50">
          <Logo loading="eager" priority="high" className="" />
        </Link>

        <HamburgerMenu navItems={navItems} />
      </div>
    </>
  )
}
