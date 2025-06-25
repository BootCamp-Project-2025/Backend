import { ICourseService } from "../../domain/interfaces/ICourseService";
import { CreateCourseUseCase } from "../../application/useCases/CreateCourseUseCase";
import { Course } from "../../domain/aggregates/Course";
import { CourseDTO } from "../../domain/dtos/CourseDTO";
import { CourseMapper } from "../../mappers/CourseMapper";
import IUseCase from "../../domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { CourseName } from "../../domain/valueObjects/CourseName";
import { CourseDescription } from "../../domain/valueObjects/CourseDescription";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

@injectable()
export class CourseService implements ICourseService {
  constructor(
    @inject("GetAllCoursesUseCase")
    private readonly getAllCoursesUseCase: IUseCase<void, Course[]>,
    @inject("GetCourseUseCase")
    private readonly GetCourseUseCase: IUseCase<string, Course>,
    @inject("EditCourseUseCase")
    private readonly EditCourseUseCase: IUseCase<Course, Course>,
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
    return CourseMapper.toAplicationDTO(course);
  }

  async deleteCourse(courseId: string): Promise<void> {
    await this.DeleteCourseUseCase.execute(courseId);
  }

  async editCourse(id: string, courseDto: CourseDTO): Promise<CourseDTO> {
    const courseName = CourseName.create({ name: courseDto.name });
    const description = CourseDescription.create({
      description: courseDto.description,
    });

    const course = Course.create(
      {
        name: courseName,
        description: description,
        imgSrc: courseDto.imgSrc,
      },
      new UniqueEntityID(id)
    );
    const courseUpdated = await this.EditCourseUseCase.execute(course);
    return CourseMapper.toAplicationDTO(courseUpdated);
  }
}
