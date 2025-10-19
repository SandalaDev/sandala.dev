import type { Project, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let projects: Project[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedProjects = await payload.find({
      collection: 'projects',
      depth: 1,
      limit,
    })

    projects = fetchedProjects.docs
  } else if (selectedDocs?.length) {
    projects = selectedDocs
      .map((project) => (typeof project.value === 'object' ? project.value : null))
      .filter(Boolean) as Project[]
  }

  return (
    <div className="my-10" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive projects={projects} />
    </div>
  )
}
