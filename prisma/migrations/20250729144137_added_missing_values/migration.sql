-- CreateEnum
CREATE TYPE "P2PCourseStatus" AS ENUM ('ACTIVE', 'CANCELED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "LiveSessionStatus" AS ENUM ('COMPLETED', 'PENDING', 'CANCELED');

-- CreateTable
CREATE TABLE "P2PCourse" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "remainingSession" INTEGER NOT NULL,
    "status" "P2PCourseStatus" NOT NULL,

    CONSTRAINT "P2PCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "P2PPost" (
    "id" TEXT NOT NULL,
    "p2pCourseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "P2PPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "P2PFilePost" (
    "id" TEXT NOT NULL,
    "p2pCourseId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "P2PFilePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveSession" (
    "id" TEXT NOT NULL,
    "p2pCourseId" TEXT NOT NULL,
    "status" "LiveSessionStatus" NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "dateOfTheSession" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "LiveSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "P2PCourse" ADD CONSTRAINT "P2PCourse_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PCourse" ADD CONSTRAINT "P2PCourse_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PPost" ADD CONSTRAINT "P2PPost_p2pCourseId_fkey" FOREIGN KEY ("p2pCourseId") REFERENCES "P2PCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PFilePost" ADD CONSTRAINT "P2PFilePost_p2pCourseId_fkey" FOREIGN KEY ("p2pCourseId") REFERENCES "P2PCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveSession" ADD CONSTRAINT "LiveSession_p2pCourseId_fkey" FOREIGN KEY ("p2pCourseId") REFERENCES "P2PCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
