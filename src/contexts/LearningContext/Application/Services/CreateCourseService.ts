import { ICourseRepository } from "../../Domain/Interfaces/ICourseRepository";
import { CreateCourseDTO } from "../dtos/CreateCourseDTO";
import { Course } from "../../Domain/Aggregates/Course";

export class CreateCourseService {
  constructor(private courseRepo: ICourseRepository) {}

  async execute(data: CreateCourseDTO): Promise<Course> {
    const course = Course.create(data);
    return await this.courseRepo.insert(course);
  }
}
