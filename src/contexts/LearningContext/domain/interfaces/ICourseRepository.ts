//erase rule once used
import { Course } from "../aggregates/Course";

export interface ICourseRepository {
  findById(id: string): Promise<Course | null>;
  findAll(): Promise<Course[]>;
  insert(course: Course): Promise<Course>;
  update(course: Course): Promise<Course>;
  delete(courseId: string): Promise<void>;
  nameAvailable(name: string): Promise<boolean>;
}
