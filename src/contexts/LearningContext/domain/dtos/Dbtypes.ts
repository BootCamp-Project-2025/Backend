import { Decimal } from "@prisma/client/runtime/library";

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
