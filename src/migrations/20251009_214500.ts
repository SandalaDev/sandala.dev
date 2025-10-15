import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-Postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Migration code
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Migration code
}
