-- AlterTable
ALTER TABLE "Url" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';
