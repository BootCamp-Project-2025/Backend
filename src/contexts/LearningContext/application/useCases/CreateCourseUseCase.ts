import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { Course } from "../../domain/aggregates/Course";
import { CourseDTO } from "../../domain/dtos/CourseDTO";
import { CourseName } from "../../domain/valueObjects/CourseName";
import { CourseDescription } from "../../domain/valueObjects/CourseDescription";
import IUseCase from "../../domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { Modules } from "../../domain/OneToMany/Modules";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

@injectable()
export class CreateCourseUseCase implements IUseCase<CourseDTO, Course> {
  constructor(
    @inject("ICourseRepository") private courseRepo: ICourseRepository
  ) {}

  async execute(courseDto: CourseDTO): Promise<Course> {
    const courseName = CourseName.create({ name: courseDto.name });
    const description = CourseDescription.create({
      description: courseDto.description,
    });
    const userId = UserId.create(new UniqueEntityID(courseDto.userId));

    const course = Course.create({
      name: courseName,
      description: description,
      imgSrc: courseDto.imgSrc,
      modules: Modules.create([]),
      userId,
      published: courseDto.published ?? false,
    });
    return await this.courseRepo.insert(course);
  }
}
