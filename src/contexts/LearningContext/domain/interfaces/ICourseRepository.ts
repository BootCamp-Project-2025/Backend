//erase rule once used
import { Course } from "../aggregates/Course";

export interface ICourseRepository {
  findById(id: string): Promise<Course | null>;
  findAll(): Promise<Course[]>;
  insert(course: Course): Promise<Course>;
  publish(id: string, published: boolean): Promise<boolean>;
  update(course: Course): Promise<Course>;
  delete(courseId: string): Promise<void>;
}
