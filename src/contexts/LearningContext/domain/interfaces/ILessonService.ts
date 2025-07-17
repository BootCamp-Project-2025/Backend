import { Lesson } from "../entities/Lesson";

export default interface ILessonService {
  create(module: Lesson, id: string): Promise<Lesson>;
  delete(moduleId: string): Promise<void>;
  update(module: Lesson): Promise<Lesson>;
}
