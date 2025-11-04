import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Project } from '../../../payload-types'

// Triggered whenever a project is created or updated
export const revalidateProject: CollectionAfterChangeHook<Project> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/projects/${doc.slug}`

    payload.logger.info(`Revalidating project at path: ${path}`)

    // Invalidate both path and sitemap cache tags
    revalidatePath(path)
    revalidateTag('projects-sitemap')
  }

  return doc
}

// Triggered whenever a project is deleted
export const revalidateDelete: CollectionAfterDeleteHook<Project> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate && doc?.slug) {
    const path = `/projects/${doc.slug}`

    revalidatePath(path)
    revalidateTag('projects-sitemap')
  }

  return doc
}
