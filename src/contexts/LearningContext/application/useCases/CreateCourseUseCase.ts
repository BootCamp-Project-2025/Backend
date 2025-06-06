import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { Course } from "../../domain/aggregates/Course";

export class CreateCourseUseCase {
  constructor(private courseRepo: ICourseRepository) {}

  async execute(course: Course): Promise<Course> {
    return await this.courseRepo.insert(course);
  }
}
