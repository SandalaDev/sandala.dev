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
      <header className="container relative z-20 mt-[-0.25rem] shadow-card header-glass hidden lg:block">
        <div className="py-8 flex justify-between">
          <Link href="/">
            <Logo loading="eager" priority="high" className="" />
          </Link>
          <HeaderNav data={data} />
        </div>
      </header>
      <div className="lg:hidden">
        <HamburgerMenu navItems={navItems} />
      </div>
    </>
  )
}
