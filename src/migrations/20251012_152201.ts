import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_technologies" AS ENUM('nextjs-icon.svg', 'react-icon.svg', 'payload-icon.svg');
  CREATE TYPE "public"."enum_posts_project_date_month" AS ENUM('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
  CREATE TYPE "public"."enum__posts_v_version_technologies" AS ENUM('nextjs-icon.svg', 'react-icon.svg', 'payload-icon.svg');
  CREATE TYPE "public"."enum__posts_v_version_project_date_month" AS ENUM('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
  CREATE TABLE "posts_technologies" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_posts_technologies",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_posts_v_version_technologies" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__posts_v_version_technologies",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "posts_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_populated_authors" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  ALTER TABLE "posts" RENAME COLUMN "published_at" TO "project_date_year";
  ALTER TABLE "_posts_v" RENAME COLUMN "version_published_at" TO "version_project_date_year";
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_posts_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_users_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_posts_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_users_fk";
  
  DROP INDEX "posts_rels_posts_id_idx";
  DROP INDEX "posts_rels_users_id_idx";
  DROP INDEX "_posts_v_rels_posts_id_idx";
  DROP INDEX "_posts_v_rels_users_id_idx";
  ALTER TABLE "posts" ADD COLUMN "project_date_month" "enum_posts_project_date_month";
  ALTER TABLE "_posts_v" ADD COLUMN "version_project_date_month" "enum__posts_v_version_project_date_month";
  ALTER TABLE "posts_technologies" ADD CONSTRAINT "posts_technologies_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_technologies" ADD CONSTRAINT "_posts_v_version_technologies_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_technologies_order_idx" ON "posts_technologies" USING btree ("order");
  CREATE INDEX "posts_technologies_parent_idx" ON "posts_technologies" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_technologies_order_idx" ON "_posts_v_version_technologies" USING btree ("order");
  CREATE INDEX "_posts_v_version_technologies_parent_idx" ON "_posts_v_version_technologies" USING btree ("parent_id");
  ALTER TABLE "posts_rels" DROP COLUMN "posts_id";
  ALTER TABLE "posts_rels" DROP COLUMN "users_id";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "users_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  ALTER TABLE "posts_technologies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_technologies" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_technologies" CASCADE;
  DROP TABLE "_posts_v_version_technologies" CASCADE;
  ALTER TABLE "posts" ADD COLUMN "published_at" timestamp(3) with time zone;
  ALTER TABLE "posts_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "posts_rels" ADD COLUMN "users_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_published_at" timestamp(3) with time zone;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "users_id" integer;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  ALTER TABLE "posts" DROP COLUMN "project_date_year";
  ALTER TABLE "posts" DROP COLUMN "project_date_month";
  ALTER TABLE "_posts_v" DROP COLUMN "version_project_date_year";
  ALTER TABLE "_posts_v" DROP COLUMN "version_project_date_month";
  DROP TYPE "public"."enum_posts_technologies";
  DROP TYPE "public"."enum_posts_project_date_month";
  DROP TYPE "public"."enum__posts_v_version_technologies";
  DROP TYPE "public"."enum__posts_v_version_project_date_month";`)
}
