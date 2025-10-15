import type { MigrateUpArgs } from '@payloadcms/db-Postgres'

export async function up({ db }: MigrateUpArgs) {
  await db.execute(`
    ALTER TABLE "projects"
    ALTER COLUMN "project_date_year" TYPE integer
    USING EXTRACT(YEAR FROM "project_date_year")::integer;
  `)
}

export async function down({ db }: MigrateUpArgs) {
  // Optional: revert to timestamp with default January 1st of that year
  await db.execute(`
    ALTER TABLE "projects"
    ALTER COLUMN "project_date_year" TYPE timestamptz
    USING make_timestamptz("project_date_year", 1, 1, 0, 0, 0);
  `)
}
