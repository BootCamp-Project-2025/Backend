-- CreateTable
CREATE TABLE "StudentTrackProgress" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "StudentTrackProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoProgress" (
    "id" TEXT NOT NULL,
    "studentTrackProgressId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "watchedSeconds" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VideoProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceCompleted" (
    "id" TEXT NOT NULL,
    "studentTrackProgressId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ResourceCompleted_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentTrackProgress" ADD CONSTRAINT "StudentTrackProgress_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTrackProgress" ADD CONSTRAINT "StudentTrackProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoProgress" ADD CONSTRAINT "VideoProgress_studentTrackProgressId_fkey" FOREIGN KEY ("studentTrackProgressId") REFERENCES "StudentTrackProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceCompleted" ADD CONSTRAINT "ResourceCompleted_studentTrackProgressId_fkey" FOREIGN KEY ("studentTrackProgressId") REFERENCES "StudentTrackProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
