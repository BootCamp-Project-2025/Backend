import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { CourseDTO } from "../../domain/dtos/CourseDTO";
import { CourseMapper } from "../../mappers/CourseMapper";

export class GetAllCoursesUseCase {
    constructor(private repo: ICourseRepository) { }
    async execute(): Promise<CourseDTO[]> {
        const courses = await this.repo.findAll();
        return courses.map(CourseMapper.toDTO);
    }
}
