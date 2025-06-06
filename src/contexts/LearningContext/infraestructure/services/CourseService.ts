import { ICourseService } from "../../domain/interfaces/ICourseService";
import { GetAllCoursesUseCase } from "../../application/useCases/GetAllCoursesUseCase";
import { CreateCourseUseCase } from "../../application/useCases/CreateCourseUseCase";
import { CourseDTO } from "../../domain/dtos/CourseDTO";
import { CourseMapper } from "../../mappers/CourseMapper";
import { Course } from "../../domain/aggregates/Course";
import { CourseName } from "../../domain/valueObjects/CourseName";
import { CourseDescription } from "../../domain/valueObjects/CourseDescription";

export class CourseService implements ICourseService {
  constructor(
    private getAllCoursesUseCase: GetAllCoursesUseCase,
    private createCoursesUseCase: CreateCourseUseCase
  ) {}

  async getAllCourses(): Promise<CourseDTO[]> {
    const courses = await this.getAllCoursesUseCase.execute();
    return courses.map(CourseMapper.toAplicationDTO);
  }

  async create(courseDto: CourseDTO): Promise<CourseDTO> {
    const courseName = CourseName.create({ name: courseDto.name });
    const description = CourseDescription.create({
      description: courseDto.description,
    });

    const course = Course.create({
      name: courseName,
      description: description,
      imgSrc: courseDto.imgSrc,
    });

    const created = await this.createCoursesUseCase.execute(course);
    return CourseMapper.toAplicationDTO(created);
  }
}
