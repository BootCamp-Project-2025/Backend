import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { Course } from "../../domain/aggregates/Course";
import IUseCase from "../../domain/interfaces/IUseCase";
import { injectable, inject } from "tsyringe";

@injectable()
export class GetAllCoursesUseCase implements IUseCase<void, Course[]> {
  constructor(
    @inject("ICourseRepository") private repo: ICourseRepository
  ) { }
  async execute(): Promise<Course[]> {
    return await this.repo.findAll();
  }
}
