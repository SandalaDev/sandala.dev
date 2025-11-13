import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Migration script to add _status: 'published' to existing pages
 * Run this after enabling versions/drafts on the Pages collection
 */
async function migrateExistingPages() {
  const payload = await getPayload({ config })

  try {
    console.log('Starting migration of existing pages...')

    // Fetch all pages without status (direct database query to bypass access control)
    const pages = await payload.db.collections.pages.find({
      where: {
        or: [{ _status: { exists: false } }, { _status: { equals: null } }],
      },
    })

    console.log(`Found ${pages.docs.length} pages without _status field`)

    // Update each page to have published status
    for (const page of pages.docs) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        data: {
          _status: 'published',
        },
        // Skip hooks to avoid triggering revalidation for every page
        overrideAccess: true,
      })

      console.log(`✓ Migrated page: ${page.title} (${page.id})`)
    }

    console.log(`\n✅ Migration complete! Migrated ${pages.docs.length} pages to published status.`)
  } catch (error) {
    console.error('❌ Migration failed:', error)
  } finally {
    process.exit(0)
  }
}

// Run the migration
migrateExistingPages()
