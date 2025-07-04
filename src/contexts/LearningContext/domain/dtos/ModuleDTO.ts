import { LessonDTO } from "./LessonDTO";

export interface ModuleDTO {
  courseId: string;
  position: number;
  id?: string;
  name: string;
  lessons?: LessonDTO[];
}
