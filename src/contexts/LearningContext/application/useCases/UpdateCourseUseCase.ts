import { CourseMapper } from "../../mappers/CourseMapper";
import { inject, injectable } from "tsyringe";
import { CourseIdDTO } from "../../domain/dtos/CourseDTO";
import { Course } from "../../domain/aggregates/Course";
import IUseCase from "../../domain/interfaces/IUseCase";
import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";

@injectable()
export class UpdateCourseUseCase implements IUseCase<CourseIdDTO, Course> {
  constructor(
    @inject("ICourseRepository") private readonly courseRepo: ICourseRepository
  ) {}

  async execute(input: CourseIdDTO): Promise<Course> {
    const domainCourse = CourseMapper.fromDTO(input);
    return this.courseRepo.update(domainCourse);
  }
}
