import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_user_edit_languages" AS ENUM('ar', 'cz', 'de', 'en', 'pl', 'ru', 'tr');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "user_edit_languages" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_user_edit_languages",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "user_edit_languages" ADD CONSTRAINT "user_edit_languages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "user_edit_languages_order_idx" ON "user_edit_languages" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "user_edit_languages_parent_idx" ON "user_edit_languages" USING btree ("parent_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "user_edit_languages";`)
}
