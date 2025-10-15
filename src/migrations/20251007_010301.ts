import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-Projectgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(`
  ALTER TABLE "media"
  ADD COLUMN IF NOT EXISTS "prefix" varchar DEFAULT 'media';
`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DROP COLUMN "prefix";`)
}
