import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-Projectgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_Projectects_technologies" AS ENUM('nextjs-icon.svg', 'react-icon.svg', 'payload-icon.svg');
  CREATE TYPE "public"."enum_Projectects_project_date_month" AS ENUM('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
  CREATE TYPE "public"."enum__Projectects_v_version_technologies" AS ENUM('nextjs-icon.svg', 'react-icon.svg', 'payload-icon.svg');
  CREATE TYPE "public"."enum__Projectects_v_version_project_date_month" AS ENUM('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
  CREATE TABLE "Projectects_technologies" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_Projectects_technologies",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_Projectects_v_version_technologies" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__Projectects_v_version_technologies",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "Projectects_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_Projectects_v_version_populated_authors" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "Projectects_populated_authors" CASCADE;
  DROP TABLE "_Projectects_v_version_populated_authors" CASCADE;
  ALTER TABLE "Projectects" RENAME COLUMN "published_at" TO "project_date_year";
  ALTER TABLE "_Projectects_v" RENAME COLUMN "version_published_at" TO "version_project_date_year";
  ALTER TABLE "Projectects_rels" DROP CONSTRAINProjectrojectsProjects_projects_fk";
  
  ALTER TABLE "Projectects_rels" DROP CONSTRAINProjectrojects_rels_users_fk";
  
  ALTER TABLE "_Projectects_v_rels" DROP CONSTRAINTProjectrojects_vProjects_projects_fk";
  
  ALTER TABLE "_Projectects_v_rels" DROP CONSTRAINTProjectrojects_v_rels_users_fk";
  
  DROP INDEX "Projectects_reProjectrojects_id_idx";
  DROP INDEX "Projectects_rels_users_id_idx";
  DROP INDEX "_Projectects_v_reProjectrojects_id_idx";
  DROP INDEX "_Projectects_v_rels_users_id_idx";
  ALTER TABLE "Projectects" ADD COLUMN "project_date_month" "enProjectrojects_project_date_month";
  ALTER TABLE "_Projectects_v" ADD COLUMN "version_project_date_month" "enuProjectrojects_v_version_project_date_month";
  ALTER TABLE "Projectects_technologies" ADD CONSTRAINProjectrojects_technologies_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "pubProject."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_Projectects_v_version_technologies" ADD CONSTRAINTProjectrojects_v_version_technologies_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "publProject"_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "Projectects_technologies_order_idx" OProjectrojects_technologies" USING btree ("order");
  CREATE INDEX "Projectects_technologies_parent_idx" OProjectrojects_technologies" USING btree ("parent_id");
  CREATE INDEX "_Projectects_v_version_technologies_order_idx" ONProjectrojects_v_version_technologies" USING btree ("order");
  CREATE INDEX "_Projectects_v_version_technologies_parent_idx" ONProjectrojects_v_version_technologies" USING btree ("parent_id");
  ALTER TABLE "Projectects_rels" DROP COLUMProjectrojects_id";
  ALTER TABLE "Projectects_rels" DROP COLUMN "users_id";
  ALTER TABLE "_Projectects_v_rels" DROP COLUMProjectrojects_id";
  ALTER TABLE "_Projectects_v_rels" DROP COLUMN "users_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "Projectects_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "_Projectects_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  ALTER TABLE "Projectects_technologies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_Projectects_v_version_technologies" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "Projectects_technologies" CASCADE;
  DROP TABLE "_Projectects_v_version_technologies" CASCADE;
  ALTER TABLE "Projectects" ADD COLUMN "published_at" timestamp(3) with time zone;
  ALTER TABLE "Projectects_rels" ADD COLUMProjectrojects_id" integer;
  ALTER TABLE "Projectects_rels" ADD COLUMN "users_id" integer;
  ALTER TABLE "_Projectects_v" ADD COLUMN "version_published_at" timestamp(3) with time zone;
  ALTER TABLE "_Projectects_v_rels" ADD COLUMProjectrojects_id" integer;
  ALTER TABLE "_Projectects_v_rels" ADD COLUMN "users_id" integer;
  ALTER TABLE "Projectects_populated_authors" ADD CONSTRAINProjectrojects_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pubProject."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_Projectects_v_version_populated_authors" ADD CONSTRAINTProjectrojects_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "publProject"_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "Projectects_populated_authors_order_idx" OProjectrojects_populated_authors" USING btree ("_order");
  CREATE INDEX "Projectects_populated_authors_parent_id_idx" OProjectrojects_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_Projectects_v_version_populated_authors_order_idx" ONProjectrojects_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_Projectects_v_version_populated_authors_parent_id_idx" ONProjectrojects_v_version_populated_authors" USING btree ("_parent_id");
  ALTER TABLE "Projectects_rels" ADD CONSTRAINProjectrojectsProjects_projects_fk" FOREIProjectEY ("projects_id") REFERENCEProjectublic"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "Projectects_rels" ADD CONSTRAINProjectrojects_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_Projectects_v_rels" ADD CONSTRAINTProjectrojects_vProjects_projects_fk" FOREIProjectEY ("projects_id") REFERENCEProjectublic"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_Projectects_v_rels" ADD CONSTRAINTProjectrojects_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "Projectects_reProjectrojects_id_idxProject "projects_rels" USINGProjectee ("projects_id");
  CREATE INDEX "Projectects_rels_users_id_idx" OProjectrojects_rels" USING btree ("users_id");
  CREATE INDEX "_Projectects_v_reProjectrojects_id_idx"Project"_projects_v_rels" USINGProjectee ("projects_id");
  CREATE INDEX "_Projectects_v_rels_users_id_idx" ONProjectrojects_v_rels" USING btree ("users_id");
  ALTER TABLE "Projectects" DROP COLUMN "project_date_year";
  ALTER TABLE "Projectects" DROP COLUMN "project_date_month";
  ALTER TABLE "_Projectects_v" DROP COLUMN "version_project_date_year";
  ALTER TABLE "_Projectects_v" DROP COLUMN "version_project_date_month";
  DROP TYPE "public"."enum_Projectects_technologies";
  DROP TYPE "public"."enum_Projectects_project_date_month";
  DROP TYPE "public"."enum__Projectects_v_version_technologies";
  DROP TYPE "public"."enum__Projectects_v_version_project_date_month";`)
}
