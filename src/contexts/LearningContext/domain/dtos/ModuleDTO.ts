import { LessonDTO } from "./LessonDTO";

export interface ModuleDTO {
  position: number;
  id?: string;
  title: string;
  lessons?: LessonDTO[];
}
