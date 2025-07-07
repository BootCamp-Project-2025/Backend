import { LessonResourceProps } from "../valueObjects/LessonResource";

export interface LessonDTO {
  id?: string;
  position: number;
  title: string;
  description: string;
  videoUrls: string[];
  resources: LessonResourceProps[];
}
