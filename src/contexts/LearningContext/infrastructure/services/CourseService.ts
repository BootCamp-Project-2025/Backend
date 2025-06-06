import { ICourseService } from "../../domain/interfaces/ICourseService";
import { CourseDTO } from "../../domain/dtos/CourseDTO";
import { CourseMapper } from "../../mappers/CourseMapper";
import IUseCase from "../../domain/interfaces/IUseCase";
import { Course } from "../../domain/aggregates/Course";

export class CourseService implements ICourseService {
  constructor(
    private readonly getAllCoursesUseCase: IUseCase<void, Course[]>
  ) {}

  async getAllCourses(): Promise<CourseDTO[]> {
    const courses = await this.getAllCoursesUseCase.execute();
    return courses.map(CourseMapper.toAplicationDTO);
  }
}
