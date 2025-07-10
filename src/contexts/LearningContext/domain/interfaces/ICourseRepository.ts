//erase rule once used
import { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { Course } from "../aggregates/Course";

export interface ICourseRepository {
  findById(id: string): Promise<Course | null>;
  findAll(): Promise<Course[]>;
  insert(course: Course): Promise<Course>;
  enrollInCourse(course: Course, user: User): Promise<void>;
  isUserEnrolled(courseId: string, userId: string): Promise<boolean>;
  update(course: Course): Promise<Course>;
  delete(courseId: string): Promise<void>;
}
