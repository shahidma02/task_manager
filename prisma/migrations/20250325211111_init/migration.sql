/*
  Warnings:

  - You are about to drop the column `created_at` on the `Project_User_Co` table. All the data in the column will be lost.
  - Added the required column `deadline` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Invite" AS ENUM ('UNACCEPTED', 'ACCEPTED');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Project_User_Co" DROP COLUMN "created_at";

-- CreateTable
CREATE TABLE "Invitation" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "sentTo" INTEGER NOT NULL,
    "status" "Invite" NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_sentTo_fkey" FOREIGN KEY ("sentTo") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
