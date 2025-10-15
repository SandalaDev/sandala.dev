import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-Projectgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    ALTER TABLE _projects_v 
    ALTER COLUMN version_project_date_year 
    TYPE integer 
    USING NULL;
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    ALTER TABLE _projects_v 
    ALTER COLUMN version_project_date_year 
    TYPE timestamp(3) with time zone 
    USING NULL;
  `)
}
