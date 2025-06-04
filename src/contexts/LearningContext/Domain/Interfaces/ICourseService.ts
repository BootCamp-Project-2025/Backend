//erase rule once used
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
import { Course } from "../../Domain/Aggregates/Course";

export interface ICourseService {
    getAllCourses(): Promise<Course[]>;
    getCourseById(id: string): Promise<Course | null>;
}
