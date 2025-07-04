import { LessonDTO } from "./LessonDTO";

export interface ModuleDTO {
  courseId?: string;
  id?: string;
  name: string;
  lessons: LessonDTO[];
}
