import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      technologies: true,
      scope: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose  max-w-none">
          <h1>projects</h1>
          <h2 className="font-medium text-xl sm:text-2xl md:text-2xl lg:text-2xl leading-relaxed">
            h2 custom subhead is gonna go here when I think of something punchy to say as intro to
            the page
          </h2>
        </div>
      </div>

      <CollectionArchive projects={projects.docs} />

      <div className="container">
        {projects.totalPages > 1 && projects.page && (
          <Pagination page={projects.page} totalPages={projects.totalPages} />
        )}
      </div>
      <div className="container mb-8 mt-24">
        <PageRange
          collection="projects"
          currentPage={projects.page}
          limit={12}
          totalDocs={projects.totalDocs}
        />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `work`,
  }
}
