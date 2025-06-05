import { ICourseService } from "../../domain/interfaces/ICourseService";
import { GetAllCoursesUseCase } from "../../aplication/useCases/GetAllCoursesUseCase";
import { CourseDTO } from "../../domain/dtos/CourseDTO";
import { CourseMapper } from "../../mappers/CourseMapper";

export class CourseService implements ICourseService {
  constructor(private readonly getAllCoursesUseCase: GetAllCoursesUseCase) { }

  async getAllCourses(): Promise<CourseDTO[]> {
    const courses = await this.getAllCoursesUseCase.execute();
    return courses.map(CourseMapper.toAplicationDTO);
  }
}
