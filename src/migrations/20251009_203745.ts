import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Rename columns with existence checks
  await db.execute(`
    DO $$
    BEGIN
      IF EXISTS(
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'pages' AND column_name = 'hero_rich_text'
      ) THEN
        ALTER TABLE "pages" RENAME COLUMN "hero_rich_text" TO "hero_headline";
      END IF;
    END $$;
  `)

  await db.execute(`
    DO $$
    BEGIN
      IF EXISTS(
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = '_pages_v' AND column_name = 'version_hero_rich_text'
      ) THEN
        ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_rich_text" TO "version_hero_headline";
      END IF;
    END $$;
  `)

  // Add columns (IF NOT EXISTS is valid here)
  await db.execute(`
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hero_subhead" jsonb;
  `)

  await db.execute(`
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_subhead" jsonb;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    DO $$
    BEGIN
      IF EXISTS(
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'pages' AND column_name = 'hero_headline'
      ) THEN
        ALTER TABLE "pages" RENAME COLUMN "hero_headline" TO "hero_rich_text";
      END IF;
    END $$;
  `)

  await db.execute(`
    DO $$
    BEGIN
      IF EXISTS(
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = '_pages_v' AND column_name = 'version_hero_headline'
      ) THEN
        ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_headline" TO "version_hero_rich_text";
      END IF;
    END $$;
  `)

  await db.execute(`
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_subhead";
  `)

  await db.execute(`
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_subhead";
  `)
}
