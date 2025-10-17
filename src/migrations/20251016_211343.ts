import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_technologies" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_projects_technologies";
  CREATE TYPE "public"."enum_projects_technologies" AS ENUM('nextjs', 'react', 'payload');
  ALTER TABLE "projects_technologies" ALTER COLUMN "value" SET DATA TYPE "public"."enum_projects_technologies" USING "value"::"public"."enum_projects_technologies";
  ALTER TABLE "_projects_v_version_technologies" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__projects_v_version_technologies";
  CREATE TYPE "public"."enum__projects_v_version_technologies" AS ENUM('nextjs', 'react', 'payload');
  ALTER TABLE "_projects_v_version_technologies" ALTER COLUMN "value" SET DATA TYPE "public"."enum__projects_v_version_technologies" USING "value"::"public"."enum__projects_v_version_technologies";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_technologies" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_projects_technologies";
  CREATE TYPE "public"."enum_projects_technologies" AS ENUM('nextjs-icon.svg', 'react-icon.svg', 'payload-icon.svg');
  ALTER TABLE "projects_technologies" ALTER COLUMN "value" SET DATA TYPE "public"."enum_projects_technologies" USING "value"::"public"."enum_projects_technologies";
  ALTER TABLE "_projects_v_version_technologies" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__projects_v_version_technologies";
  CREATE TYPE "public"."enum__projects_v_version_technologies" AS ENUM('nextjs-icon.svg', 'react-icon.svg', 'payload-icon.svg');
  ALTER TABLE "_projects_v_version_technologies" ALTER COLUMN "value" SET DATA TYPE "public"."enum__projects_v_version_technologies" USING "value"::"public"."enum__projects_v_version_technologies";`)
}
