import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Project } from '@/payload-types'

import { ProjectHero } from '@/heros/ProjectHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = projects.docs.map(({ slug }: any) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Project({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/projects/' + slug
  const project = await queryProjectBySlug({ slug })

  if (!project) return <PayloadRedirects url={url} />

  const payload = await getPayload({ config: configPromise })
  const otherProjects = await payload.find({
    collection: 'projects',
    draft,
    limit: 3,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: { not_equals: slug },
      _status: { equals: 'published' },
    },
    select: {
      title: true,
      slug: true,
      meta: true,
    },
  })

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <ProjectHero project={Project as any} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText
            className="max-w-[48rem] mx-auto"
            data={(project as any).content}
            enableGutter={false}
          />

          {otherProjects.docs && otherProjects.docs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl mb-4">Other projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
                {otherProjects.docs.map((doc: any, index: number) => (
                  <div key={index} className="col-span-1">
                    {/* Reuse Card via CollectionArchive signature */}
                    {/* Using a small inline card-like layout to avoid import cycles */}
                    <div className="border rounded-xl p-4">
                      <a href={`/projects/${doc.slug}`} className="text-lg font-semibold">
                        {doc.title}
                      </a>
                      {doc.meta?.description && (
                        <p className="text-sm mt-2">{doc.meta.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const project = await queryProjectBySlug({ slug })

  return generateMeta({ doc: project as Project })
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
