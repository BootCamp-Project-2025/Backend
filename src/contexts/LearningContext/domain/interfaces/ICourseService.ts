//erase rule once used
import { CourseDTO } from "../dtos/CourseDTO";

export interface ICourseService {
  getAllCourses(): Promise<CourseDTO[]>;
  create(courseDto: CourseDTO): Promise<CourseDTO>;
  publish(courseId: string): Promise<boolean>;
  updateCourse(id: string, courseDto: CourseDTO): Promise<CourseDTO>;
  deleteCourse(id: string): Promise<void>;
}
