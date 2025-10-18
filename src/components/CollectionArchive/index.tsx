import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardProjectData } from '@/components/Card'

export type Props = {
  projects: CardProjectData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { projects } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="flex flex-col gap-8">
          {projects?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return <Card key={index} className="w-full" doc={result} relationTo="projects" />
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
