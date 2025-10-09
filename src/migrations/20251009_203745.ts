import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" RENAME COLUMN "hero_rich_text" TO "hero_headline";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_rich_text" TO "version_hero_headline";
  ALTER TABLE "pages" ADD COLUMN "hero_subhead" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_subhead" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" RENAME COLUMN "hero_headline" TO "hero_rich_text";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_headline" TO "version_hero_rich_text";
  ALTER TABLE "pages" DROP COLUMN "hero_subhead";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_subhead";`)
}
