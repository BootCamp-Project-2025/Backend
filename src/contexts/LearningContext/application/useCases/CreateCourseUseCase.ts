import { ICourseRepository } from "../../Domain/Interfaces/ICourseRepository";
import { CourseDTO } from "../../Domain/dtos/CourseDTO";
import { Course } from "../../Domain/Aggregates/Course";
import { CourseName } from "../../Domain/valueObjects/CourseName";
import { CourseDescription } from "../../Domain/valueObjects/CourseDescription";

export class CreateCourseUseCase {
  constructor(private courseRepo: ICourseRepository) {}

  async execute(data: CourseDTO): Promise<Course> {
    const name = CourseName.create({ name: data.name });
    const description = CourseDescription.create({
      description: data.description,
    });

    const course = Course.create({
      name,
      description,
      imgSrc: data.imgSrc,
    });
    return await this.courseRepo.insert(course);
  }
}
