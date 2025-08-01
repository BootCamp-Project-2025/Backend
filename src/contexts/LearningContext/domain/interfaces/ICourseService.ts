//erase rule once used
import { QueryParamsDto } from "@/contexts/CoreContext/domain/interfaces/dtos/search/QueryParamsDto";
import { CourseDTO } from "../dtos/CourseDTO";
import { Course } from "../aggregates/Course";
import { PageDto } from "@/contexts/CoreContext/domain/interfaces/dtos/search/PageDto";

export interface ICourseService {
  getAllCourses(): Promise<CourseDTO[]>;
  create(courseDto: CourseDTO): Promise<CourseDTO>;
  publish(courseId: string): Promise<boolean>;
  getCourse(courseId: string): Promise<CourseDTO>;
  deleteCourse(courseId: string): Promise<void>;
  editCourse(id: string, courseDto: CourseDTO): Promise<CourseDTO>;
  updateCourse(id: string, courseDto: CourseDTO): Promise<CourseDTO>;
  searchCourse(queryParam: QueryParamsDto): Promise<PageDto<Course>>;
}
