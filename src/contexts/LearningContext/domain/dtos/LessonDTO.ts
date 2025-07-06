import { LessonResource } from "../entities/Lesson";

export interface LessonDTO {
  id?: string;
  position: number;
  title: string;
  description: string;
  videoUrls: string[];
  resources: LessonResource[];
}
