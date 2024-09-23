import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "t_profile_locales" ADD COLUMN "weapons_primary" varchar DEFAULT '';`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "t_profile_locales" DROP COLUMN IF EXISTS "weapons_primary";`)
}
