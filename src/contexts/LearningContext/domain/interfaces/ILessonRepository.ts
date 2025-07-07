import { Lesson } from "../entities/Lesson";

export default interface ILessonRepository {
  create(module: Lesson, courseId: string): Promise<Lesson>;
  delete(moduleId: string): Promise<void>;
  update(module: Lesson): Promise<Lesson>;
  findById(lessonId: string): Promise<Lesson | null>;
}
