import { LessonResource } from "../entities/Lesson";

export interface LessonDTO {
  id?: string;
  title: string;
  description: string;
  videoUrls: string[];
  resources: LessonResource[];
}
