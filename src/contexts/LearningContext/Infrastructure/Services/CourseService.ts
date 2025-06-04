import { ICourseService } from "../../Domain/Interfaces/ICourseService";
import { ICourseRepository } from "../../Domain/Interfaces/ICourseRepository";
import { Course } from "../../Domain/Aggregates/Course";

export class CourseService implements ICourseService {
    constructor(private readonly courseRepository: ICourseRepository) { }

    async getAllCourses(): Promise<Course[]> {
        return this.courseRepository.findAll();
    }

    async getCourseById(id: string): Promise<Course | null> {
        return this.courseRepository.findById(id);
    }
}
