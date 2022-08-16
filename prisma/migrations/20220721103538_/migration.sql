/*
  Warnings:

  - Added the required column `room_id` to the `devicedata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "devicedata" ADD COLUMN     "room_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "devicedata" ADD CONSTRAINT "devicedata_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
