//erase rule once used
import { CourseDTO } from "../dtos/CourseDTO";

export interface ICourseService {
  getAllCourses(): Promise<CourseDTO[]>;
  create(courseDto: CourseDTO): Promise<CourseDTO>;
  getCourse(courseId: string): Promise<CourseDTO>;
  deleteCourse(courseId: string): Promise<void>;
  editCourse(id: string, courseDto: CourseDTO): Promise<CourseDTO>;
}
