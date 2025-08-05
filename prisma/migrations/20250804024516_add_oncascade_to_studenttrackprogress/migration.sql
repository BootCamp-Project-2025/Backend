-- DropForeignKey
ALTER TABLE "ResourceCompleted" DROP CONSTRAINT "ResourceCompleted_studentTrackProgressId_fkey";

-- DropForeignKey
ALTER TABLE "StudentTrackProgress" DROP CONSTRAINT "StudentTrackProgress_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "VideoProgress" DROP CONSTRAINT "VideoProgress_studentTrackProgressId_fkey";

-- AddForeignKey
ALTER TABLE "StudentTrackProgress" ADD CONSTRAINT "StudentTrackProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoProgress" ADD CONSTRAINT "VideoProgress_studentTrackProgressId_fkey" FOREIGN KEY ("studentTrackProgressId") REFERENCES "StudentTrackProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceCompleted" ADD CONSTRAINT "ResourceCompleted_studentTrackProgressId_fkey" FOREIGN KEY ("studentTrackProgressId") REFERENCES "StudentTrackProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
