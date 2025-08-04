//erase rule once used
import { CourseDTO } from "../dtos/CourseDTO";

export interface ICourseService {
  getAllCourses(): Promise<CourseDTO[]>;
  create(courseDto: CourseDTO): Promise<CourseDTO>;
  publish(courseId: string, published: boolean): Promise<boolean>;
  getCourse(courseId: string): Promise<CourseDTO>;
  deleteCourse(courseId: string): Promise<void>;
  editCourse(id: string, courseDto: CourseDTO): Promise<CourseDTO>;
  updateCourse(id: string, courseDto: CourseDTO): Promise<CourseDTO>;
}
