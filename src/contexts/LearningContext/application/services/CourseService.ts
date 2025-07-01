import { ICourseService } from "../../domain/interfaces/ICourseService";
import { Course } from "../../domain/aggregates/Course";
import { CourseDTO, CourseIdDTO } from "../../domain/dtos/CourseDTO";
import { CourseMapper } from "../../mappers/CourseMapper";
import IUseCase from "../../domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class CourseService implements ICourseService {
  constructor(
    @inject("GetAllCoursesUseCase")
    private readonly getAllCoursesUseCase: IUseCase<void, Course[]>,

    @inject("CreateCourseUseCase")
    private readonly createCourseUseCase: IUseCase<CourseDTO, Course>,

    @inject("UpdateCourseUseCase")
    private readonly updateCourseUseCase: IUseCase<CourseIdDTO, Course>,

    @inject("DeleteCourseUseCase")
    private readonly deleteCourseUseCase: IUseCase<string, void>
  ) {}

  async getAllCourses(): Promise<CourseIdDTO[]> {
    const courses = await this.getAllCoursesUseCase.execute();
    return courses.map(CourseMapper.toAplicationDTO);
  }

  async create(courseDto: CourseDTO): Promise<CourseDTO> {
    const created = await this.createCourseUseCase.execute(courseDto);
    return CourseMapper.toAplicationDTO(created);
  }

  async updateCourse(id: string, courseDto: CourseDTO): Promise<CourseDTO> {
    const input: CourseIdDTO = { id, ...courseDto };
    const updated = await this.updateCourseUseCase.execute(input);
    return CourseMapper.toAplicationDTO(updated);
  }

  async deleteCourse(id: string): Promise<void> {
    await this.deleteCourseUseCase.execute(id);
  }
}
