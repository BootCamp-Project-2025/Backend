//erase rule once used
import { CourseDTO } from "../dtos/CourseDTO";

export interface ICourseService {
  getAllCourses(): Promise<CourseDTO[]>;
  create(courseDto: CourseDTO): Promise<CourseDTO>;
  updateCourse(id: string, courseDto: CourseDTO): Promise<CourseDTO>;
  deleteCourse(id: string): Promise<void>;
}
