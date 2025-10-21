import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tabs_block_showcase_demo_tabs_benefits_icon" AS ENUM('payload', 'openSource', 'ownership');
  CREATE TYPE "public"."enum__tabs_block_v_showcase_demo_tabs_benefits_icon" AS ENUM('payload', 'openSource', 'ownership');
  CREATE TABLE "tabs_block_showcase_demo_tabs_desktop_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt_text" varchar
  );
  
  CREATE TABLE "tabs_block_showcase_demo_tabs_tablet_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt_text" varchar
  );
  
  CREATE TABLE "tabs_block_showcase_demo_tabs_mobile_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt_text" varchar
  );
  
  CREATE TABLE "tabs_block_showcase_demo_tabs_benefits_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE "tabs_block_showcase_demo_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_name" varchar,
  	"tab_description" varchar,
  	"benefits_subheading" varchar,
  	"benefits_icon" "enum_tabs_block_showcase_demo_tabs_benefits_icon"
  );
  
  CREATE TABLE "tabs_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"showcase_showcase_heading" varchar DEFAULT 'The Power of Composability',
  	"showcase_showcase_subheading" varchar DEFAULT 'Build once, reconfigure forever. Your app adapts as your business grows.',
  	"showcase_slideshow_speed" numeric DEFAULT 4,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"comparison_section_table_heading" varchar DEFAULT 'Spoiler: I could just use WordPress for everything — but then your project wouldn''t do all the cool stuff.',
  	"comparison_section_table_subheading" varchar,
  	"comparison_section_flexibility_feature_payload_text" varchar DEFAULT 'Full application framework — build anything from course platforms to inventory systems to social networks',
  	"comparison_section_flexibility_feature_wordpress_text" varchar DEFAULT 'Great for blogs and basic sites, but becomes messy for complex apps',
  	"comparison_section_flexibility_feature_shopify_text" varchar DEFAULT 'E-commerce focused — difficult to build non-shopping experiences',
  	"comparison_section_flexibility_feature_squarespace_text" varchar DEFAULT 'Websites only — can''t build custom apps or user dashboards',
  	"comparison_section_customization_feature_payload_text" varchar DEFAULT 'Unlimited — custom user roles, workflows, dashboards, integrations, business logic',
  	"comparison_section_customization_feature_wordpress_text" varchar DEFAULT 'Plugins help, but you''re limited by what exists or gets complex fast',
  	"comparison_section_customization_feature_shopify_text" varchar DEFAULT 'Apps extend it, but you''re stuck within Shopify''s e-commerce framework',
  	"comparison_section_customization_feature_squarespace_text" varchar DEFAULT 'Templates and basic customization only — no custom functionality',
  	"comparison_section_ownership_feature_payload_text" varchar DEFAULT 'Complete ownership — host anywhere, modify anything, no vendor lock-in',
  	"comparison_section_ownership_feature_wordpress_text" varchar DEFAULT 'You own it, but hosting and maintenance can get complex',
  	"comparison_section_ownership_feature_shopify_text" varchar DEFAULT 'Hosted service — your business depends on their platform',
  	"comparison_section_ownership_feature_squarespace_text" varchar DEFAULT 'Hosted service — you''re renting, not owning',
  	"comparison_section_scalability_feature_payload_text" varchar DEFAULT 'Scales from startup to enterprise — no platform limitations, just outgrow',
  	"comparison_section_scalability_feature_wordpress_text" varchar DEFAULT 'Can scale, but performance issues with complex sites',
  	"comparison_section_scalability_feature_shopify_text" varchar DEFAULT 'Scales for e-commerce, but locked into their ecosystem',
  	"comparison_section_scalability_feature_squarespace_text" varchar DEFAULT 'Limited by plan tiers — may need to rebuild as you grow',
  	"comparison_section_developer_experience_feature_payload_text" varchar DEFAULT 'Modern tech stack, built for developers — easy to maintain and expand over time',
  	"comparison_section_developer_experience_feature_wordpress_text" varchar DEFAULT 'Legacy PHP codebase — can become maintenance nightmare',
  	"comparison_section_developer_experience_feature_shopify_text" varchar DEFAULT 'Decent developer tools, but limited to e-commerce use cases',
  	"comparison_section_developer_experience_feature_squarespace_text" varchar DEFAULT 'No code access — developers can''t help beyond basic styling',
  	"block_name" varchar
  );
  
  CREATE TABLE "_tabs_block_v_showcase_demo_tabs_desktop_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tabs_block_v_showcase_demo_tabs_tablet_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tabs_block_v_showcase_demo_tabs_mobile_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tabs_block_v_showcase_demo_tabs_benefits_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tabs_block_v_showcase_demo_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tab_name" varchar,
  	"tab_description" varchar,
  	"benefits_subheading" varchar,
  	"benefits_icon" "enum__tabs_block_v_showcase_demo_tabs_benefits_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tabs_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"showcase_showcase_heading" varchar DEFAULT 'The Power of Composability',
  	"showcase_showcase_subheading" varchar DEFAULT 'Build once, reconfigure forever. Your app adapts as your business grows.',
  	"showcase_slideshow_speed" numeric DEFAULT 4,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"comparison_section_table_heading" varchar DEFAULT 'Spoiler: I could just use WordPress for everything — but then your project wouldn''t do all the cool stuff.',
  	"comparison_section_table_subheading" varchar,
  	"comparison_section_flexibility_feature_payload_text" varchar DEFAULT 'Full application framework — build anything from course platforms to inventory systems to social networks',
  	"comparison_section_flexibility_feature_wordpress_text" varchar DEFAULT 'Great for blogs and basic sites, but becomes messy for complex apps',
  	"comparison_section_flexibility_feature_shopify_text" varchar DEFAULT 'E-commerce focused — difficult to build non-shopping experiences',
  	"comparison_section_flexibility_feature_squarespace_text" varchar DEFAULT 'Websites only — can''t build custom apps or user dashboards',
  	"comparison_section_customization_feature_payload_text" varchar DEFAULT 'Unlimited — custom user roles, workflows, dashboards, integrations, business logic',
  	"comparison_section_customization_feature_wordpress_text" varchar DEFAULT 'Plugins help, but you''re limited by what exists or gets complex fast',
  	"comparison_section_customization_feature_shopify_text" varchar DEFAULT 'Apps extend it, but you''re stuck within Shopify''s e-commerce framework',
  	"comparison_section_customization_feature_squarespace_text" varchar DEFAULT 'Templates and basic customization only — no custom functionality',
  	"comparison_section_ownership_feature_payload_text" varchar DEFAULT 'Complete ownership — host anywhere, modify anything, no vendor lock-in',
  	"comparison_section_ownership_feature_wordpress_text" varchar DEFAULT 'You own it, but hosting and maintenance can get complex',
  	"comparison_section_ownership_feature_shopify_text" varchar DEFAULT 'Hosted service — your business depends on their platform',
  	"comparison_section_ownership_feature_squarespace_text" varchar DEFAULT 'Hosted service — you''re renting, not owning',
  	"comparison_section_scalability_feature_payload_text" varchar DEFAULT 'Scales from startup to enterprise — no platform limitations, just outgrow',
  	"comparison_section_scalability_feature_wordpress_text" varchar DEFAULT 'Can scale, but performance issues with complex sites',
  	"comparison_section_scalability_feature_shopify_text" varchar DEFAULT 'Scales for e-commerce, but locked into their ecosystem',
  	"comparison_section_scalability_feature_squarespace_text" varchar DEFAULT 'Limited by plan tiers — may need to rebuild as you grow',
  	"comparison_section_developer_experience_feature_payload_text" varchar DEFAULT 'Modern tech stack, built for developers — easy to maintain and expand over time',
  	"comparison_section_developer_experience_feature_wordpress_text" varchar DEFAULT 'Legacy PHP codebase — can become maintenance nightmare',
  	"comparison_section_developer_experience_feature_shopify_text" varchar DEFAULT 'Decent developer tools, but limited to e-commerce use cases',
  	"comparison_section_developer_experience_feature_squarespace_text" varchar DEFAULT 'No code access — developers can''t help beyond basic styling',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "tabs_block_showcase_demo_tabs_desktop_images" ADD CONSTRAINT "tabs_block_showcase_demo_tabs_desktop_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tabs_block_showcase_demo_tabs_desktop_images" ADD CONSTRAINT "tabs_block_showcase_demo_tabs_desktop_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabs_block_showcase_demo_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabs_block_showcase_demo_tabs_tablet_images" ADD CONSTRAINT "tabs_block_showcase_demo_tabs_tablet_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tabs_block_showcase_demo_tabs_tablet_images" ADD CONSTRAINT "tabs_block_showcase_demo_tabs_tablet_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabs_block_showcase_demo_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabs_block_showcase_demo_tabs_mobile_images" ADD CONSTRAINT "tabs_block_showcase_demo_tabs_mobile_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tabs_block_showcase_demo_tabs_mobile_images" ADD CONSTRAINT "tabs_block_showcase_demo_tabs_mobile_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabs_block_showcase_demo_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabs_block_showcase_demo_tabs_benefits_list" ADD CONSTRAINT "tabs_block_showcase_demo_tabs_benefits_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabs_block_showcase_demo_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabs_block_showcase_demo_tabs" ADD CONSTRAINT "tabs_block_showcase_demo_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabs_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabs_block" ADD CONSTRAINT "tabs_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_table" ADD CONSTRAINT "pages_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tabs_block_v_showcase_demo_tabs_desktop_images" ADD CONSTRAINT "_tabs_block_v_showcase_demo_tabs_desktop_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tabs_block_v_showcase_demo_tabs_desktop_images" ADD CONSTRAINT "_tabs_block_v_showcase_demo_tabs_desktop_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tabs_block_v_showcase_demo_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tabs_block_v_showcase_demo_tabs_tablet_images" ADD CONSTRAINT "_tabs_block_v_showcase_demo_tabs_tablet_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tabs_block_v_showcase_demo_tabs_tablet_images" ADD CONSTRAINT "_tabs_block_v_showcase_demo_tabs_tablet_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tabs_block_v_showcase_demo_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tabs_block_v_showcase_demo_tabs_mobile_images" ADD CONSTRAINT "_tabs_block_v_showcase_demo_tabs_mobile_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tabs_block_v_showcase_demo_tabs_mobile_images" ADD CONSTRAINT "_tabs_block_v_showcase_demo_tabs_mobile_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tabs_block_v_showcase_demo_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tabs_block_v_showcase_demo_tabs_benefits_list" ADD CONSTRAINT "_tabs_block_v_showcase_demo_tabs_benefits_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tabs_block_v_showcase_demo_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tabs_block_v_showcase_demo_tabs" ADD CONSTRAINT "_tabs_block_v_showcase_demo_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tabs_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tabs_block_v" ADD CONSTRAINT "_tabs_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_table" ADD CONSTRAINT "_pages_v_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "tabs_block_showcase_demo_tabs_desktop_images_order_idx" ON "tabs_block_showcase_demo_tabs_desktop_images" USING btree ("_order");
  CREATE INDEX "tabs_block_showcase_demo_tabs_desktop_images_parent_id_idx" ON "tabs_block_showcase_demo_tabs_desktop_images" USING btree ("_parent_id");
  CREATE INDEX "tabs_block_showcase_demo_tabs_desktop_images_image_idx" ON "tabs_block_showcase_demo_tabs_desktop_images" USING btree ("image_id");
  CREATE INDEX "tabs_block_showcase_demo_tabs_tablet_images_order_idx" ON "tabs_block_showcase_demo_tabs_tablet_images" USING btree ("_order");
  CREATE INDEX "tabs_block_showcase_demo_tabs_tablet_images_parent_id_idx" ON "tabs_block_showcase_demo_tabs_tablet_images" USING btree ("_parent_id");
  CREATE INDEX "tabs_block_showcase_demo_tabs_tablet_images_image_idx" ON "tabs_block_showcase_demo_tabs_tablet_images" USING btree ("image_id");
  CREATE INDEX "tabs_block_showcase_demo_tabs_mobile_images_order_idx" ON "tabs_block_showcase_demo_tabs_mobile_images" USING btree ("_order");
  CREATE INDEX "tabs_block_showcase_demo_tabs_mobile_images_parent_id_idx" ON "tabs_block_showcase_demo_tabs_mobile_images" USING btree ("_parent_id");
  CREATE INDEX "tabs_block_showcase_demo_tabs_mobile_images_image_idx" ON "tabs_block_showcase_demo_tabs_mobile_images" USING btree ("image_id");
  CREATE INDEX "tabs_block_showcase_demo_tabs_benefits_list_order_idx" ON "tabs_block_showcase_demo_tabs_benefits_list" USING btree ("_order");
  CREATE INDEX "tabs_block_showcase_demo_tabs_benefits_list_parent_id_idx" ON "tabs_block_showcase_demo_tabs_benefits_list" USING btree ("_parent_id");
  CREATE INDEX "tabs_block_showcase_demo_tabs_order_idx" ON "tabs_block_showcase_demo_tabs" USING btree ("_order");
  CREATE INDEX "tabs_block_showcase_demo_tabs_parent_id_idx" ON "tabs_block_showcase_demo_tabs" USING btree ("_parent_id");
  CREATE INDEX "tabs_block_order_idx" ON "tabs_block" USING btree ("_order");
  CREATE INDEX "tabs_block_parent_id_idx" ON "tabs_block" USING btree ("_parent_id");
  CREATE INDEX "tabs_block_path_idx" ON "tabs_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_table_order_idx" ON "pages_blocks_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_table_parent_id_idx" ON "pages_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_table_path_idx" ON "pages_blocks_table" USING btree ("_path");
  CREATE INDEX "_tabs_block_v_showcase_demo_tabs_desktop_images_order_idx" ON "_tabs_block_v_showcase_demo_tabs_desktop_images" USING btree ("_order");
  CREATE INDEX "_tabs_block_v_showcase_demo_tabs_desktop_images_parent_id_idx" ON "_tabs_block_v_showcase_demo_tabs_desktop_images" USING btree ("_parent_id");
  CREATE INDEX "_tabs_block_v_showcase_demo_tabs_desktop_images_image_idx" ON "_tabs_block_v_showcase_demo_tabs_desktop_images" USING btree ("image_id");
  CREATE INDEX "_tabs_block_v_showcase_demo_tabs_tablet_images_order_idx" ON "_tabs_block_v_showcase_demo_tabs_tablet_images" USING btree ("_order");
  CREATE INDEX "_tabs_block_v_showcase_demo_tabs_tablet_images_parent_id_idx" ON "_tabs_block_v_showcase_demo_tabs_tablet_images" USING btree ("_parent_id");
  CREATE INDEX "_tabs_block_v_showcase_demo_tabs_tablet_images_image_idx" ON "_tabs_block_v_showcase_demo_tabs_tablet_images" USING btree ("image_id");
  CREATE INDEX "_tabs_block_v_showcase_demo_tabs_mobile_images_order_idx" ON "_tabs_block_v_showcase_demo_tabs_mobile_images" USING btree ("_order");
  CREATE INDEX "_tabs_block_v_showcase_demo_tabs_mobile_images_parent_id_idx" ON "_tabs_block_v_showcase_demo_tabs_mobile_images" USING btree ("_parent_id");
  CREATE INDEX "_tabs_block_v_showcase_demo_tabs_mobile_images_image_idx" ON "_tabs_block_v_showcase_demo_tabs_mobile_images" USING btree ("image_id");
  CREATE INDEX "_tabs_block_v_showcase_demo_tabs_benefits_list_order_idx" ON "_tabs_block_v_showcase_demo_tabs_benefits_list" USING btree ("_order");
  CREATE INDEX "_tabs_block_v_showcase_demo_tabs_benefits_list_parent_id_idx" ON "_tabs_block_v_showcase_demo_tabs_benefits_list" USING btree ("_parent_id");
  CREATE INDEX "_tabs_block_v_showcase_demo_tabs_order_idx" ON "_tabs_block_v_showcase_demo_tabs" USING btree ("_order");
  CREATE INDEX "_tabs_block_v_showcase_demo_tabs_parent_id_idx" ON "_tabs_block_v_showcase_demo_tabs" USING btree ("_parent_id");
  CREATE INDEX "_tabs_block_v_order_idx" ON "_tabs_block_v" USING btree ("_order");
  CREATE INDEX "_tabs_block_v_parent_id_idx" ON "_tabs_block_v" USING btree ("_parent_id");
  CREATE INDEX "_tabs_block_v_path_idx" ON "_tabs_block_v" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_table_order_idx" ON "_pages_v_blocks_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_table_parent_id_idx" ON "_pages_v_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_table_path_idx" ON "_pages_v_blocks_table" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "tabs_block_showcase_demo_tabs_desktop_images" CASCADE;
  DROP TABLE "tabs_block_showcase_demo_tabs_tablet_images" CASCADE;
  DROP TABLE "tabs_block_showcase_demo_tabs_mobile_images" CASCADE;
  DROP TABLE "tabs_block_showcase_demo_tabs_benefits_list" CASCADE;
  DROP TABLE "tabs_block_showcase_demo_tabs" CASCADE;
  DROP TABLE "tabs_block" CASCADE;
  DROP TABLE "pages_blocks_table" CASCADE;
  DROP TABLE "_tabs_block_v_showcase_demo_tabs_desktop_images" CASCADE;
  DROP TABLE "_tabs_block_v_showcase_demo_tabs_tablet_images" CASCADE;
  DROP TABLE "_tabs_block_v_showcase_demo_tabs_mobile_images" CASCADE;
  DROP TABLE "_tabs_block_v_showcase_demo_tabs_benefits_list" CASCADE;
  DROP TABLE "_tabs_block_v_showcase_demo_tabs" CASCADE;
  DROP TABLE "_tabs_block_v" CASCADE;
  DROP TABLE "_pages_v_blocks_table" CASCADE;
  DROP TYPE "public"."enum_tabs_block_showcase_demo_tabs_benefits_icon";
  DROP TYPE "public"."enum__tabs_block_v_showcase_demo_tabs_benefits_icon";`)
}
