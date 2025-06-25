import { ICourseService } from "../../domain/interfaces/ICourseService";
import { CreateCourseUseCase } from "../../application/useCases/CreateCourseUseCase";
import { Course } from "../../domain/aggregates/Course";
import { CourseDTO } from "../../domain/dtos/CourseDTO";
import { CourseMapper } from "../../mappers/CourseMapper";
import IUseCase from "../../domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class CourseService implements ICourseService {
  constructor(
    @inject("GetAllCoursesUseCase")
    private readonly getAllCoursesUseCase: IUseCase<void, Course[]>,
    @inject("GetCourseUseCase")
    private readonly GetCourseUseCase: IUseCase<string, Course>,
    @inject("EditCourseUseCase")
    private readonly EditCourseUseCase: IUseCase<CourseDTO, Course>,
    @inject("DeleteCourseUseCase")
    private readonly DeleteCourseUseCase: IUseCase<string, void>,
    @inject("CreateCourseUseCase")
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

  async getCourse(courseId: string): Promise<CourseDTO> {
    const course = await this.GetCourseUseCase.execute(courseId);
    return CourseMapper.domainToDto(course);
  }

  async deleteCourse(courseId: string): Promise<void> {
    await this.DeleteCourseUseCase.execute(courseId);
  }

  async editCourse(id: string, courseDto: CourseDTO): Promise<CourseDTO> {
    courseDto.id = id;
    const courseUpdated = await this.EditCourseUseCase.execute(courseDto);
    return CourseMapper.domainToDto(courseUpdated);
  }
}
