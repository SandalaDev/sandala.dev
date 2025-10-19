import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_scope" AS ENUM('Brand Strategy', 'Content Strategy', 'Front-End Development', 'Back-End Development', 'Database Design', 'User Training', 'UI & Brand Design', 'System Architecture', 'Hosting & Deployment', 'SEO & Analytics', 'Creative Direction', 'Brand Voice & Tone', 'Naming & Messaging', 'Content Writing');
  CREATE TYPE "public"."enum__projects_v_version_scope" AS ENUM('Brand Strategy', 'Content Strategy', 'Front-End Development', 'Back-End Development', 'Database Design', 'User Training', 'UI & Brand Design', 'System Architecture', 'Hosting & Deployment', 'SEO & Analytics', 'Creative Direction', 'Brand Voice & Tone', 'Naming & Messaging', 'Content Writing');
  CREATE TABLE "projects_scope" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_projects_scope",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_scope" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__projects_v_version_scope",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "projects_scope" ADD CONSTRAINT "projects_scope_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_scope" ADD CONSTRAINT "_projects_v_version_scope_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_scope_order_idx" ON "projects_scope" USING btree ("order");
  CREATE INDEX "projects_scope_parent_idx" ON "projects_scope" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_scope_order_idx" ON "_projects_v_version_scope" USING btree ("order");
  CREATE INDEX "_projects_v_version_scope_parent_idx" ON "_projects_v_version_scope" USING btree ("parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE "projects_scope" CASCADE;
  DROP TABLE "_projects_v_version_scope" CASCADE;
  DROP TYPE "public"."enum_projects_scope";
  DROP TYPE "public"."enum__projects_v_version_scope";`)
}
