import { ICourseService } from "../../domain/interfaces/ICourseService";
import { Course } from "../../domain/aggregates/Course";
import { CourseDTO } from "../../domain/dtos/CourseDTO";
import { CourseMapper } from "../../mappers/CourseMapper";
import IUseCase from "../../domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { QueryParamsDto } from "@/contexts/CoreContext/domain/interfaces/dtos/search/QueryParamsDto";
import { PageDto } from "@/contexts/CoreContext/domain/interfaces/dtos/search/PageDto";

@injectable()
export class CourseService implements ICourseService {
  constructor(
    @inject("GetAllCoursesUseCase")
    private readonly getAllCoursesUseCase: IUseCase<void, Course[]>,
    @inject("GetCourseUseCase")
    private readonly GetCourseUseCase: IUseCase<string, Course>,
    @inject("EditCourseUseCase")
    private readonly EditCourseUseCase: IUseCase<CourseDTO, Course>,

    @inject("CreateCourseUseCase")
    private readonly createCourseUseCase: IUseCase<CourseDTO, Course>,

    @inject("UpdateCourseUseCase")
    private readonly updateCourseUseCase: IUseCase<CourseDTO, Course>,

    @inject("DeleteCourseUseCase")
    private readonly deleteCourseUseCase: IUseCase<string, void>,

    @inject("PublishCourseUseCase")
    private publishCourseUseCase: IUseCase<string, boolean>,

    @inject("SearchCoursesUseCase")
    private readonly searchCoursesUseCase: IUseCase<
      QueryParamsDto,
      PageDto<Course>
    >
  ) {}

  async getAllCourses(): Promise<CourseDTO[]> {
    const courses = await this.getAllCoursesUseCase.execute();
    return courses.map(CourseMapper.toAplicationDTO);
  }

  async create(courseDto: CourseDTO): Promise<CourseDTO> {
    const created = await this.createCourseUseCase.execute(courseDto);
    return CourseMapper.toAplicationDTO(created);
  }

  async publish(courseId: string): Promise<boolean> {
    try {
      return await this.publishCourseUseCase.execute(courseId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error accesing the publish execution"
      );
    }
  }
  async getCourse(courseId: string): Promise<CourseDTO> {
    const course = await this.GetCourseUseCase.execute(courseId);
    return CourseMapper.domainToDto(course);
  }

  async editCourse(id: string, courseDto: CourseDTO): Promise<CourseDTO> {
    courseDto.id = id;
    const courseUpdated = await this.EditCourseUseCase.execute(courseDto);
    return CourseMapper.domainToDto(courseUpdated);
  }
  async updateCourse(id: string, courseDto: CourseDTO): Promise<CourseDTO> {
    const input: CourseDTO = { id, ...courseDto };
    const updated = await this.updateCourseUseCase.execute(input);
    return CourseMapper.toAplicationDTO(updated);
  }

  async deleteCourse(id: string): Promise<void> {
    await this.deleteCourseUseCase.execute(id);
  }

  async searchCourse(params: QueryParamsDto): Promise<PageDto<Course>> {
    return await this.searchCoursesUseCase.execute(params);
  }
}
