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
  moduleId: string;
};

export type ResourceDb = {
  id?: string;
  name: string;
  url: string;
  lessonId: string;
};
