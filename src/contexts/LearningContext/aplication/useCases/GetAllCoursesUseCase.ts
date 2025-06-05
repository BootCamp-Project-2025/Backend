import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { Course } from "../../domain/aggregates/Course";

export class GetAllCoursesUseCase {
  constructor(private repo: ICourseRepository) {}
  async execute(): Promise<Course[]> {
    return await this.repo.findAll();
  }
}
