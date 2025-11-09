'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */

  const pathname = usePathname()

  return (
    <header className="container relative z-20  header-glass mt-[-0.25rem] shadow-card ">
      <div className="py-8 flex justify-between text-red-600">
        <Link href="/">
          <Logo loading="eager" priority="high" className="" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
