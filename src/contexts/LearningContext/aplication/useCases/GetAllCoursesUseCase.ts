import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { Course } from "../../domain/aggregates/Course";
import IUseCase from "../../domain/interfaces/IUseCase";

export class GetAllCoursesUseCase implements IUseCase<void, Course[]> {
  constructor(private repo: ICourseRepository) {}
  async execute(): Promise<Course[]> {
    return await this.repo.findAll();
  }
}
