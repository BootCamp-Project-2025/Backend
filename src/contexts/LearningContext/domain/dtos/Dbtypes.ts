import { Decimal } from "@prisma/client/runtime/library";
import { $Enums } from "@/generated/prisma";

export type ModuleDb = {
  lessons: LessonDb[];
  quizzes: QuizDb[];
  title: string;
  id: string;
  position: Decimal;
  courseId: string;
};

export type LessonDb = {
  title: string;
  id: string;
  position: Decimal;
  description: string;
  videoUrls: string[];
  moduleId: string;
  resources: ResourceDb[];
};

export type QuizDb = {
  id?: string;
  name: string;
  url: string;
};

export type ResourceDb = {
  id?: string;
  name: string;
  url: string;
  lessonId: string;
};

export type VideoProgressDb = {
  id?: string;
  url: string;
  watchedSeconds: number;
  completed: boolean;
};

export type ResourceCompletedDb = {
  id?: string;
  url: string;
};

export type StudentTrackProgressDb = {
  id: string;
  enrollmentId: string;
  lessonId: string;
  completed: boolean;
  completedAt: Date | null;
  videoProgresses: VideoProgressDb[];
  resourcesCompleted: ResourceCompletedDb[];
};

type P2PPostDB = {
  id: string;
  p2pCourseId: string;
  title: string;
  description: string;
  url: string;
  creationDate: Date;
};

type P2PFilePostDB = {
  id: string;
  p2pCourseId: string;
  url: string;
  creationDate: Date;
};

type LiveSessionDB = {
  id: string;
  p2pCourseId: string;
  status: $Enums.LiveSessionStatus;
  creationDate: Date;
  dateOfTheSession: Date;
  url: string;
};

export type P2PCourseDB = {
  id: string;
  teacherId: string;
  chatId: string;
  studentId: string;
  name: string;
  remainingSession: number;
  status: $Enums.P2PCourseStatus;
  posts: P2PPostDB[];
  files: P2PFilePostDB[];
  sessions: LiveSessionDB[];
  teacherName: string;
};