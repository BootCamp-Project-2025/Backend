import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { Course } from "../../domain/aggregates/Course";
import { CourseDTO } from "../../domain/dtos/CourseDTO";
import { CourseName } from "../../domain/valueObjects/CourseName";
import { CourseDescription } from "../../domain/valueObjects/CourseDescription";
import { IUseCase } from "../../domain/interfaces/IUseCase";

export class CreateCourseUseCase implements IUseCase<CourseDTO, Course> {
  constructor(private courseRepo: ICourseRepository) {}

  async execute(courseDto: CourseDTO): Promise<Course> {
    const courseName = CourseName.create({ name: courseDto.name });
    const description = CourseDescription.create({
      description: courseDto.description,
    });

    const course = Course.create({
      name: courseName,
      description: description,
      imgSrc: courseDto.imgSrc,
    });
    return await this.courseRepo.insert(course);
  }
}
