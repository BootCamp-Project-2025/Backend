-- DropForeignKey
ALTER TABLE "StudentTrackProgress" DROP CONSTRAINT "StudentTrackProgress_enrollmentId_fkey";

-- AddForeignKey
ALTER TABLE "StudentTrackProgress" ADD CONSTRAINT "StudentTrackProgress_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
