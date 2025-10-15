import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-Postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Step 1: Convert enum columns to text temporarily
  await db.execute(sql`
    ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relation_to" TYPE text;
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relation_to" TYPE text;
  `)

  // Step 2: Update the data from 'Projectects' to 'projects'
  await db.execute(sql`
    UPDATE "pages_blocks_archive" 
    SET "relation_to" = 'projects' 
    WHERE "relation_to" = 'Projectects';
  `)

  await db.execute(sql`
    UPDATE "_pages_v_blocks_archive" 
    SET "relation_to" = 'projects' 
    WHERE "relation_to" = 'Projectects';
  `)

  // Step 3: Now run the rest of the migration
  await db.execute(sql`
   ALTER TYPE "public"."enum_Projectects_technologies" RENAME TO "enum_projects_technologies";
  ALTER TYPE "public"."enum_Projectects_project_date_month" RENAME TO "enum_projects_project_date_month";
  ALTER TYPE "public"."enum_Projectects_status" RENAME TO "enum_projects_status";
  ALTER TYPE "public"."enum__Projectects_v_version_technologies" RENAME TO "enum__projects_v_version_technologies";
  ALTER TYPE "public"."enum__Projectects_v_version_project_date_month" RENAME TO "enum__projects_v_version_project_date_month";
  ALTER TYPE "public"."enum__Projectects_v_version_status" RENAME TO "enum__projects_v_version_status";
  ALTER TABLE "Projectects_technologies" RENAME TO "projects_technologies";
  ALTER TABLE "Projectects" RENAME TO "projects";
  ALTER TABLE "Projectects_rels" RENAME TO "projects_rels";
  ALTER TABLE "_Projectects_v_version_technologies" RENAME TO "_projects_v_version_technologies";
  ALTER TABLE "_Projectects_v" RENAME TO "_projects_v";
  ALTER TABLE "_Projectects_v_rels" RENAME TO "_projects_v_rels";
  ALTER TABLE "pages_rels" RENAME COLUMN "Projectects_id" TO "projects_id";
  ALTER TABLE "_pages_v_rels" RENAME COLUMN "Projectects_id" TO "projects_id";
  ALTER TABLE "redirects_rels" RENAME COLUMN "Projectects_id" TO "projects_id";
  ALTER TABLE "search_rels" RENAME COLUMN "Projectects_id" TO "projects_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "Projectects_id" TO "projects_id";
  ALTER TABLE "header_rels" RENAME COLUMN "Projectects_id" TO "projects_id";
  ALTER TABLE "footer_rels" RENAME COLUMN "Projectects_id" TO "projects_id";
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_Projectects_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_Projectects_fk";
  
  ALTER TABLE "projects_technologies" DROP CONSTRAINT "Projectects_technologies_parent_fk";
  
  ALTER TABLE "projects" DROP CONSTRAINT "Projectects_hero_image_id_media_id_fk";
  
  ALTER TABLE "projects" DROP CONSTRAINT "Projectects_meta_image_id_media_id_fk";
  
  ALTER TABLE "projects_rels" DROP CONSTRAINT "Projectects_rels_parent_fk";
  
  ALTER TABLE "projects_rels" DROP CONSTRAINT "Projectects_rels_categories_fk";
  
  ALTER TABLE "_projects_v_version_technologies" DROP CONSTRAINT "_Projectects_v_version_technologies_parent_fk";
  
  ALTER TABLE "_projects_v" DROP CONSTRAINT "_Projectects_v_parent_Projectrojects_id_fk";
  
  ALTER TABLE "_projects_v" DROP CONSTRAINT "_Projectects_v_version_hero_image_id_media_id_fk";
  
  ALTER TABLE "_projects_v" DROP CONSTRAINT "_Projectects_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "_projects_v_rels" DROP CONSTRAINT "_Projectects_v_rels_parent_fk";
  
  ALTER TABLE "_projects_v_rels" DROP CONSTRAINT "_Projectects_v_rels_categories_fk";
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_Projectects_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_Projectects_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_Projectects_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_Projectects_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_Projectects_fk";
  
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'projects'::text;
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('projects');
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'projects'::"public"."enum_pages_blocks_archive_relation_to";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum_pages_blocks_archive_relation_to" USING "relation_to"::"public"."enum_pages_blocks_archive_relation_to";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'projects'::text;
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('projects');
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'projects'::"public"."enum__pages_v_blocks_archive_relation_to";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum__pages_v_blocks_archive_relation_to" USING "relation_to"::"public"."enum__pages_v_blocks_archive_relation_to";
  DROP INDEX "pages_rels_Projectects_id_idx";
  DROP INDEX "_pages_v_rels_Projectects_id_idx";
  DROP INDEX "Projectects_technologies_order_idx";
  DROP INDEX "Projectects_technologies_parent_idx";
  DROP INDEX "Projectects_hero_image_idx";
  DROP INDEX "Projectects_meta_meta_image_idx";
  DROP INDEX "Projectects_slug_idx";
  DROP INDEX "Projectects_updated_at_idx";
  DROP INDEX "Projectects_created_at_idx";
  DROP INDEX "Projectects__status_idx";
  DROP INDEX "Projectects_rels_order_idx";
  DROP INDEX "Projectects_rels_parent_idx";
  DROP INDEX "Projectects_rels_path_idx";
  DROP INDEX "Projectects_rels_categories_id_idx";
  DROP INDEX "_Projectects_v_version_technologies_order_idx";
  DROP INDEX "_Projectects_v_version_technologies_parent_idx";
  DROP INDEX "_Projectects_v_parent_idx";
  DROP INDEX "_Projectects_v_version_version_hero_image_idx";
  DROP INDEX "_Projectects_v_version_meta_version_meta_image_idx";
  DROP INDEX "_Projectects_v_version_version_slug_idx";
  DROP INDEX "_Projectects_v_version_version_updated_at_idx";
  DROP INDEX "_Projectects_v_version_version_created_at_idx";
  DROP INDEX "_Projectects_v_version_version__status_idx";
  DROP INDEX "_Projectects_v_created_at_idx";
  DROP INDEX "_Projectects_v_updated_at_idx";
  DROP INDEX "_Projectects_v_latest_idx";
  DROP INDEX "_Projectects_v_autosave_idx";
  DROP INDEX "_Projectects_v_rels_order_idx";
  DROP INDEX "_Projectects_v_rels_parent_idx";
  DROP INDEX "_Projectects_v_rels_path_idx";
  DROP INDEX "_Projectects_v_rels_categories_id_idx";
  DROP INDEX "redirects_rels_Projectects_id_idx";
  DROP INDEX "search_rels_Projectects_id_idx";
  DROP INDEX "payload_locked_documents_rels_Projectects_id_idx";
  DROP INDEX "header_rels_Projectects_id_idx";
  DROP INDEX "footer_rels_Projectects_id_idx";
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_technologies" ADD CONSTRAINT "projects_technologies_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_technologies" ADD CONSTRAINT "_projects_v_version_technologies_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id");
  CREATE INDEX "projects_technologies_order_idx" ON "projects_technologies" USING btree ("order");
  CREATE INDEX "projects_technologies_parent_idx" ON "projects_technologies" USING btree ("parent_id");
  CREATE INDEX "projects_hero_image_idx" ON "projects" USING btree ("hero_image_id");
  CREATE INDEX "projects_meta_meta_image_idx" ON "projects" USING btree ("meta_image_id");
  CREATE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_categories_id_idx" ON "projects_rels" USING btree ("categories_id");
  CREATE INDEX "_projects_v_version_technologies_order_idx" ON "_projects_v_version_technologies" USING btree ("order");
  CREATE INDEX "_projects_v_version_technologies_parent_idx" ON "_projects_v_version_technologies" USING btree ("parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_hero_image_idx" ON "_projects_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_categories_id_idx" ON "_projects_v_rels" USING btree ("categories_id");
  CREATE INDEX "redirects_rels_projects_id_idx" ON "redirects_rels" USING btree ("projects_id");
  CREATE INDEX "search_rels_projects_id_idx" ON "search_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "header_rels_projects_id_idx" ON "header_rels" USING btree ("projects_id");
  CREATE INDEX "footer_rels_projects_id_idx" ON "footer_rels" USING btree ("projects_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Add down migration if needed
}
