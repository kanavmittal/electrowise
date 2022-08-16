/*
  Warnings:

  - You are about to drop the column `deviceDataId` on the `Device` table. All the data in the column will be lost.
  - Added the required column `name` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "deviceDataId",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "name" TEXT NOT NULL;
