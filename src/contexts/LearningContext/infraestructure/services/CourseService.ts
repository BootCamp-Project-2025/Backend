import { ICourseService } from "../../domain/interfaces/ICourseService";
import { CreateCourseUseCase } from "../../application/useCases/CreateCourseUseCase";
import { CourseDTO } from "../../domain/dtos/CourseDTO";
import { CourseMapper } from "../../mappers/CourseMapper";
import { Course } from "../../domain/aggregates/Course";
import { IUseCase } from "../../domain/interfaces/IUseCase";

export class CourseService implements ICourseService {
  constructor(
    private readonly getAllCoursesUseCase: IUseCase<void, Course[]>,
    private createCoursesUseCase: CreateCourseUseCase
  ) {}

  async getAllCourses(): Promise<CourseDTO[]> {
    const courses = await this.getAllCoursesUseCase.execute();
    return courses.map(CourseMapper.toAplicationDTO);
  }

  async create(courseDto: CourseDTO): Promise<CourseDTO> {
    const created = await this.createCoursesUseCase.execute(courseDto);
    return CourseMapper.toAplicationDTO(created);
  }
}
