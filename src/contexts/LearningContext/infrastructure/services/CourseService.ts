import { ICourseService } from "../../domain/interfaces/ICourseService";
import { GetAllCoursesUseCase } from "../../aplication/useCases/GetAllCoursesUseCase";
import { CourseDTO } from "../../domain/dtos/CourseDTO";

export class CourseService implements ICourseService {
    constructor(private readonly getAllCoursesUseCase: GetAllCoursesUseCase) { }

    async getAllCourses(): Promise<CourseDTO[]> {
        return this.getAllCoursesUseCase.execute();
    }
}
