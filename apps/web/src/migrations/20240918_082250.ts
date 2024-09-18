import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_raid_member_role" AS ENUM('leader', 'officer', 'member', 'alumni', 'banned');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "raid_invite" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"raid_id" uuid NOT NULL,
  	"code" varchar NOT NULL,
  	"conditions" jsonb,
  	"expires" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "raid_member" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"raid_id" uuid NOT NULL,
  	"user_id" uuid NOT NULL,
  	"role" "enum_raid_member_role" DEFAULT 'member' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "raid_settings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"raid_id" uuid NOT NULL,
  	"owner_id" uuid,
  	"permissions_leader_members_read" boolean DEFAULT true,
  	"permissions_leader_members_manage" boolean DEFAULT true,
  	"permissions_officer_members_read" boolean DEFAULT true,
  	"permissions_officer_members_manage" boolean DEFAULT false,
  	"permissions_member_members_read" boolean DEFAULT true,
  	"permissions_member_members_manage" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "raid" ADD COLUMN "owner_id" uuid NOT NULL;
  ALTER TABLE "raid" ADD COLUMN "server_id" uuid;
  ALTER TABLE "t_common_locales" ADD COLUMN "actions_delete" varchar DEFAULT '';
  ALTER TABLE "t_common_locales" ADD COLUMN "actions_remove" varchar DEFAULT '';
  ALTER TABLE "t_common_locales" ADD COLUMN "warning_delete" varchar DEFAULT '';
  ALTER TABLE "t_profile_locales" ADD COLUMN "responses_unit_deleted" varchar DEFAULT '';
  DO $$ BEGIN
   ALTER TABLE "raid_invite" ADD CONSTRAINT "raid_invite_raid_id_raid_id_fk" FOREIGN KEY ("raid_id") REFERENCES "public"."raid"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "raid_member" ADD CONSTRAINT "raid_member_raid_id_raid_id_fk" FOREIGN KEY ("raid_id") REFERENCES "public"."raid"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "raid_member" ADD CONSTRAINT "raid_member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "raid_settings" ADD CONSTRAINT "raid_settings_raid_id_raid_id_fk" FOREIGN KEY ("raid_id") REFERENCES "public"."raid"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "raid_settings" ADD CONSTRAINT "raid_settings_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "raid_invite_code_idx" ON "raid_invite" USING btree ("code");
  CREATE INDEX IF NOT EXISTS "raid_invite_created_at_idx" ON "raid_invite" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "raid_member_created_at_idx" ON "raid_member" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "raid_settings_created_at_idx" ON "raid_settings" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "raid" ADD CONSTRAINT "raid_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "raid" ADD CONSTRAINT "raid_server_id_server_id_fk" FOREIGN KEY ("server_id") REFERENCES "public"."server"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "raid_invite";
  DROP TABLE "raid_member";
  DROP TABLE "raid_settings";
  ALTER TABLE "raid" DROP CONSTRAINT "raid_owner_id_user_id_fk";
  
  ALTER TABLE "raid" DROP CONSTRAINT "raid_server_id_server_id_fk";
  
  ALTER TABLE "raid" DROP COLUMN IF EXISTS "owner_id";
  ALTER TABLE "raid" DROP COLUMN IF EXISTS "server_id";
  ALTER TABLE "t_common_locales" DROP COLUMN IF EXISTS "actions_delete";
  ALTER TABLE "t_common_locales" DROP COLUMN IF EXISTS "actions_remove";
  ALTER TABLE "t_common_locales" DROP COLUMN IF EXISTS "warning_delete";
  ALTER TABLE "t_profile_locales" DROP COLUMN IF EXISTS "responses_unit_deleted";`)
}
