//erase rule once used
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
import { CourseDTO } from "../dtos/CourseDTO";

export interface ICourseService {
    getAllCourses(): Promise<CourseDTO[]>;
}
