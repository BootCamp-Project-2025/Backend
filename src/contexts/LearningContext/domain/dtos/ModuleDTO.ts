import { LessonDTO } from "./LessonDTO";

export interface ModuleDTO {
  id?: string;
  name: string;
  lessons: LessonDTO[];
}
