import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."_locales" AS ENUM('ar', 'cz', 'de', 'en', 'pl', 'ru', 'tr');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_user_roles" AS ENUM('banned', 'user', 'member', 'translator', 'maintainer', 'admin');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_user_unit_status" AS ENUM('training', 'ready', 'maxed');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_weapon_type" AS ENUM('light', 'medium', 'heavy');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "language" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"language_code" varchar NOT NULL,
  	"country_code" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"blur_hash" varchar,
  	"prefix" varchar DEFAULT 'media',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_blur_url" varchar,
  	"sizes_blur_width" numeric,
  	"sizes_blur_height" numeric,
  	"sizes_blur_mime_type" varchar,
  	"sizes_blur_filesize" numeric,
  	"sizes_blur_filename" varchar,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "raid" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "server" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"code" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "session" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"user_id" uuid NOT NULL,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "unit_mastery_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "unit_mastery_nodes_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "unit_mastery_nodes_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "unit" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"leadership" numeric NOT NULL,
  	"leadership_doc" numeric,
  	"stars" numeric NOT NULL,
  	"max_level" numeric NOT NULL,
  	"type_id" uuid NOT NULL,
  	"category_id" uuid NOT NULL,
  	"era_id" uuid NOT NULL,
  	"image_id" uuid,
  	"image_settings_x" numeric DEFAULT 0 NOT NULL,
  	"image_settings_y" numeric DEFAULT 0 NOT NULL,
  	"image_settings_scale" numeric DEFAULT 1 NOT NULL,
  	"mastery_has_mastery" boolean,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "unit_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "unit_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "unit_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"unit_tag_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "unit_type" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug" varchar,
  	"weight" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "unit_type_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "unit_type_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "unit_era" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug" varchar,
  	"weight" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "unit_era_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "unit_era_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "unit_category" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug" varchar,
  	"weight" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "unit_category_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "unit_category_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "unit_tag" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "user_weapons" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"weapon_id" uuid,
  	"leadership" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "user_roles" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_user_roles",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "user" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"username" varchar,
  	"level" numeric,
  	"native_language_id" uuid,
  	"light_leadership" numeric,
  	"medium_leadership" numeric,
  	"heavy_leadership" numeric,
  	"slug" varchar,
  	"discord_id" varchar NOT NULL,
  	"discord_username" varchar,
  	"avatar" varchar,
  	"raid_id" uuid,
  	"metadata" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "user_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"language_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "user_unit" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"user_id" uuid NOT NULL,
  	"unit_id" uuid NOT NULL,
  	"status" "enum_user_unit_status" NOT NULL,
  	"favourite" boolean,
  	"has_leadership_doc" boolean,
  	"mastery_nodes" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "weapon" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"type" "enum_weapon_type",
  	"icon_id" uuid,
  	"slug" varchar,
  	"weight" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "weapon_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "weapon_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"user_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "t_common" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "t_common_locales" (
  	"actions_save" varchar DEFAULT '',
  	"actions_cancel" varchar DEFAULT '',
  	"actions_confirm" varchar DEFAULT '',
  	"actions_preview" varchar DEFAULT '',
  	"actions_copy" varchar DEFAULT '',
  	"actions_copied" varchar DEFAULT '',
  	"responses_success" varchar DEFAULT '',
  	"responses_error" varchar DEFAULT '',
  	"responses_something_went_wrong" varchar DEFAULT '',
  	"responses_not_found" varchar DEFAULT '',
  	"responses_nothing_found" varchar DEFAULT '',
  	"responses_must_be_logged_in" varchar DEFAULT '',
  	"responses_fields_are_invalid" varchar DEFAULT '',
  	"warning_label" varchar DEFAULT '',
  	"warning_unsaved_changes" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "t_common_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "t_auth" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "t_auth_locales" (
  	"actions_sign_in" varchar DEFAULT '',
  	"actions_sign_out" varchar DEFAULT '',
  	"sign_in_subtitle" varchar DEFAULT '',
  	"sign_in_sign_in_with_discord" varchar DEFAULT '',
  	"sign_in_legal_notice" varchar DEFAULT '',
  	"sign_in_security_concerns" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "t_auth_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "t_navigation" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "t_navigation_locales" (
  	"news_label" varchar DEFAULT '',
  	"units_label" varchar DEFAULT '',
  	"units_all_units_label" varchar DEFAULT '',
  	"units_all_units_description" varchar DEFAULT '',
  	"units_doctrines_label" varchar DEFAULT '',
  	"units_doctrines_description" varchar DEFAULT '',
  	"units_guides_label" varchar DEFAULT '',
  	"units_guides_description" varchar DEFAULT '',
  	"units_tier_list_label" varchar DEFAULT '',
  	"units_tier_list_description" varchar DEFAULT '',
  	"weapons_label" varchar DEFAULT '',
  	"weapons_all_weapons_label" varchar DEFAULT '',
  	"weapons_all_weapons_description" varchar DEFAULT '',
  	"weapons_guides_label" varchar DEFAULT '',
  	"weapons_guides_description" varchar DEFAULT '',
  	"weapons_tier_list_label" varchar DEFAULT '',
  	"weapons_tier_list_description" varchar DEFAULT '',
  	"tools_label" varchar DEFAULT '',
  	"tools_leadership_calculator_label" varchar DEFAULT '',
  	"tools_leadership_calculator_description" varchar DEFAULT '',
  	"tools_unit_xp_calculator_label" varchar DEFAULT '',
  	"tools_unit_xp_calculator_description" varchar DEFAULT '',
  	"tools_scrim_planner_label" varchar DEFAULT '',
  	"tools_scrim_planner_description" varchar DEFAULT '',
  	"actions_switch_language" varchar DEFAULT '',
  	"actions_toggle_color_scheme" varchar DEFAULT '',
  	"menu_notifications" varchar DEFAULT '',
  	"menu_profile" varchar DEFAULT '',
  	"menu_create_profile" varchar DEFAULT '',
  	"menu_join_raid" varchar DEFAULT '',
  	"menu_create_raid" varchar DEFAULT '',
  	"menu_dashboard" varchar DEFAULT '',
  	"menu_translate" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "t_navigation_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "t_profile" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "t_profile_locales" (
  	"actions_create_profile" varchar DEFAULT '',
  	"actions_edit_profile" varchar DEFAULT '',
  	"actions_delete_profile" varchar DEFAULT '',
  	"responses_create_success" varchar DEFAULT '',
  	"responses_update_success" varchar DEFAULT '',
  	"responses_unit_added" varchar DEFAULT '',
  	"create_title" varchar DEFAULT '',
  	"create_subtitle" varchar DEFAULT '',
  	"username_label" varchar DEFAULT '',
  	"username_placeholder" varchar DEFAULT '',
  	"username_description" varchar DEFAULT '',
  	"slug_label" varchar DEFAULT '',
  	"slug_placeholder" varchar DEFAULT '',
  	"slug_description" varchar DEFAULT '',
  	"slug_slug_taken" varchar DEFAULT '',
  	"language_native_language_label" varchar DEFAULT '',
  	"language_native_language_placeholder" varchar DEFAULT '',
  	"language_other_languages_label" varchar DEFAULT '',
  	"language_other_languages_placeholder" varchar DEFAULT '',
  	"language_no_language_found" varchar DEFAULT '',
  	"leadership_label" varchar DEFAULT '',
  	"leadership_description" varchar DEFAULT '',
  	"leadership_light" varchar DEFAULT '',
  	"leadership_medium" varchar DEFAULT '',
  	"leadership_heavy" varchar DEFAULT '',
  	"weapons_label" varchar DEFAULT '',
  	"weapons_add_weapon" varchar DEFAULT '',
  	"weapons_leadership_description" varchar DEFAULT '',
  	"weapons_leadership_tip" varchar DEFAULT '',
  	"raid_manager" varchar DEFAULT '',
  	"exclusive_features" varchar DEFAULT '',
  	"units_label" varchar DEFAULT '',
  	"units_dont_have_units" varchar DEFAULT '',
  	"units_add_unit" varchar DEFAULT '',
  	"units_add_units" varchar DEFAULT '',
  	"units_hide_owned" varchar DEFAULT '',
  	"units_status" varchar DEFAULT '',
  	"units_favourite" varchar DEFAULT '',
  	"units_has_leadership_doc" varchar DEFAULT '',
  	"units_unlocked_mastery_nodes" varchar DEFAULT '',
  	"units_max" varchar DEFAULT '',
  	"units_training_label" varchar DEFAULT '',
  	"units_training_description" varchar DEFAULT '',
  	"units_ready_label" varchar DEFAULT '',
  	"units_ready_description" varchar DEFAULT '',
  	"units_maxed_label" varchar DEFAULT '',
  	"units_maxed_description" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "t_profile_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "t_validation" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "t_validation_locales" (
  	"invalid" varchar DEFAULT '',
  	"required" varchar DEFAULT '',
  	"min_char" varchar DEFAULT '',
  	"max_char" varchar DEFAULT '',
  	"min_num" varchar DEFAULT '',
  	"max_num" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	CONSTRAINT "t_validation_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DO $$ BEGIN
   ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "unit_mastery_nodes" ADD CONSTRAINT "unit_mastery_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."unit"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "unit_mastery_nodes_locales" ADD CONSTRAINT "unit_mastery_nodes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."unit_mastery_nodes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "unit" ADD CONSTRAINT "unit_type_id_unit_type_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."unit_type"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "unit" ADD CONSTRAINT "unit_category_id_unit_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."unit_category"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "unit" ADD CONSTRAINT "unit_era_id_unit_era_id_fk" FOREIGN KEY ("era_id") REFERENCES "public"."unit_era"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "unit" ADD CONSTRAINT "unit_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "unit_locales" ADD CONSTRAINT "unit_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."unit"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "unit_rels" ADD CONSTRAINT "unit_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."unit"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "unit_rels" ADD CONSTRAINT "unit_rels_unit_tag_fk" FOREIGN KEY ("unit_tag_id") REFERENCES "public"."unit_tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "unit_type_locales" ADD CONSTRAINT "unit_type_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."unit_type"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "unit_era_locales" ADD CONSTRAINT "unit_era_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."unit_era"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "unit_category_locales" ADD CONSTRAINT "unit_category_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."unit_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "user_weapons" ADD CONSTRAINT "user_weapons_weapon_id_weapon_id_fk" FOREIGN KEY ("weapon_id") REFERENCES "public"."weapon"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "user_weapons" ADD CONSTRAINT "user_weapons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "user" ADD CONSTRAINT "user_native_language_id_language_id_fk" FOREIGN KEY ("native_language_id") REFERENCES "public"."language"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "user" ADD CONSTRAINT "user_raid_id_raid_id_fk" FOREIGN KEY ("raid_id") REFERENCES "public"."raid"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "user_rels" ADD CONSTRAINT "user_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "user_rels" ADD CONSTRAINT "user_rels_language_fk" FOREIGN KEY ("language_id") REFERENCES "public"."language"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "user_unit" ADD CONSTRAINT "user_unit_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "user_unit" ADD CONSTRAINT "user_unit_unit_id_unit_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."unit"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "weapon" ADD CONSTRAINT "weapon_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "weapon_locales" ADD CONSTRAINT "weapon_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."weapon"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_user_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "t_common_locales" ADD CONSTRAINT "t_common_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."t_common"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "t_auth_locales" ADD CONSTRAINT "t_auth_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."t_auth"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "t_navigation_locales" ADD CONSTRAINT "t_navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."t_navigation"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "t_profile_locales" ADD CONSTRAINT "t_profile_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."t_profile"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "t_validation_locales" ADD CONSTRAINT "t_validation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."t_validation"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "language_name_idx" ON "language" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "language_created_at_idx" ON "language" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_blur_sizes_blur_filename_idx" ON "media" USING btree ("sizes_blur_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "raid_created_at_idx" ON "raid" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "server_created_at_idx" ON "server" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "session_created_at_idx" ON "session" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "unit_mastery_nodes_order_idx" ON "unit_mastery_nodes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "unit_mastery_nodes_parent_id_idx" ON "unit_mastery_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "unit_slug_idx" ON "unit" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "unit_created_at_idx" ON "unit" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "unit_rels_order_idx" ON "unit_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "unit_rels_parent_idx" ON "unit_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "unit_rels_path_idx" ON "unit_rels" USING btree ("path");
  CREATE UNIQUE INDEX IF NOT EXISTS "unit_type_slug_idx" ON "unit_type" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "unit_type_created_at_idx" ON "unit_type" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "unit_era_slug_idx" ON "unit_era" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "unit_era_created_at_idx" ON "unit_era" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "unit_category_slug_idx" ON "unit_category" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "unit_category_created_at_idx" ON "unit_category" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "unit_tag_created_at_idx" ON "unit_tag" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "user_weapons_order_idx" ON "user_weapons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "user_weapons_parent_id_idx" ON "user_weapons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "user_roles_order_idx" ON "user_roles" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "user_roles_parent_idx" ON "user_roles" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "user_username_idx" ON "user" USING btree ("username");
  CREATE UNIQUE INDEX IF NOT EXISTS "user_slug_idx" ON "user" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "user_discord_id_idx" ON "user" USING btree ("discord_id");
  CREATE INDEX IF NOT EXISTS "user_created_at_idx" ON "user" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "user_rels_order_idx" ON "user_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "user_rels_parent_idx" ON "user_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "user_rels_path_idx" ON "user_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "user_unit_created_at_idx" ON "user_unit" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "weapon_slug_idx" ON "weapon" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "weapon_created_at_idx" ON "weapon" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "language";
  DROP TABLE "media";
  DROP TABLE "raid";
  DROP TABLE "server";
  DROP TABLE "session";
  DROP TABLE "unit_mastery_nodes";
  DROP TABLE "unit_mastery_nodes_locales";
  DROP TABLE "unit";
  DROP TABLE "unit_locales";
  DROP TABLE "unit_rels";
  DROP TABLE "unit_type";
  DROP TABLE "unit_type_locales";
  DROP TABLE "unit_era";
  DROP TABLE "unit_era_locales";
  DROP TABLE "unit_category";
  DROP TABLE "unit_category_locales";
  DROP TABLE "unit_tag";
  DROP TABLE "user_weapons";
  DROP TABLE "user_roles";
  DROP TABLE "user";
  DROP TABLE "user_rels";
  DROP TABLE "user_unit";
  DROP TABLE "weapon";
  DROP TABLE "weapon_locales";
  DROP TABLE "payload_preferences";
  DROP TABLE "payload_preferences_rels";
  DROP TABLE "payload_migrations";
  DROP TABLE "t_common";
  DROP TABLE "t_common_locales";
  DROP TABLE "t_auth";
  DROP TABLE "t_auth_locales";
  DROP TABLE "t_navigation";
  DROP TABLE "t_navigation_locales";
  DROP TABLE "t_profile";
  DROP TABLE "t_profile_locales";
  DROP TABLE "t_validation";
  DROP TABLE "t_validation_locales";`)
}
