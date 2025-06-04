//erase rule once used
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
import { Course } from "../Aggregates/Course";

export interface ICourseRepository {
    findById(id: string): Promise<Course | null>;
    findAll(): Promise<Course[]>;
}

