import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  console.log('Fixing project_date_year types in projects and _projects_v…')

  // Convert main projects.project_date_year to integer if it's not already
  await db.execute(`
    ALTER TABLE "projects"
    ALTER COLUMN "project_date_year" TYPE integer
    USING "project_date_year"::integer;
  `)

  // Convert versioning table _projects_v.version_project_date_year to integer
  await db.execute(`
    ALTER TABLE "_projects_v"
    ALTER COLUMN "version_project_date_year" TYPE integer
    USING "version_project_date_year"::integer;
  `)

  console.log('✅ project_date_year types fixed.')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  console.log('Reverting project_date_year types back to timestamp…')

  await db.execute(`
    ALTER TABLE "projects"
    ALTER COLUMN "project_date_year" TYPE timestamp with time zone
    USING to_timestamp("project_date_year"::text, 'YYYY');
  `)

  await db.execute(`
    ALTER TABLE "_projects_v"
    ALTER COLUMN "version_project_date_year" TYPE timestamp with time zone
    USING to_timestamp("version_project_date_year"::text, 'YYYY');
  `)

  console.log('✅ Reverted project_date_year types.')
}
