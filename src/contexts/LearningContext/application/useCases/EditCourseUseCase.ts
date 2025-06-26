import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { Course } from "../../domain/aggregates/Course";
import IUseCase from "../../domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { CourseDTO } from "../../domain/dtos/CourseDTO";
import { CourseLanguage } from "../../domain/valueObjects/CourseLanguage";
import { CourseDescription } from "../../domain/valueObjects/CourseDescription";
import { CourseCategory } from "../../domain/valueObjects/CourseCategory";
import { CourseField } from "../../domain/valueObjects/CourseField";
import { CourseRequirements } from "../../domain/valueObjects/CourseRequirements";
import { CourseSubCategory } from "../../domain/valueObjects/CourseSubCategory";
import { CourseName } from "../../domain/valueObjects/CourseName";

@injectable()
export class EditCourseUseCase implements IUseCase<CourseDTO, Course> {
  constructor(
    @inject("ICourseRepository") private courseRepository: ICourseRepository
  ) {}

  async execute(courseDto: CourseDTO): Promise<Course> {
    try {
      if (courseDto.id === undefined)
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "an id is required for update"
        );
      if (!(await this.courseRepository.nameAvailable(courseDto.name)))
        throw new ApiError(StatusCodes.CONFLICT, "this name alredy exist");
      const course = await this.courseRepository.findById(courseDto.id);
      if (course === null)
        throw new ApiError(StatusCodes.NOT_FOUND, "this course doesnt exist");
      this.updateCourse(course, courseDto);
      return await this.courseRepository.update(course);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error in EditCourseUseCase"
      );
    }
  }

  updateCourse(course: Course, courseDto: CourseDTO): void {
    if (courseDto.name)
      course.setName(CourseName.create({ name: courseDto.name }));

    if (courseDto.description)
      course.setDescription(
        CourseDescription.create({ description: courseDto.description })
      );

    if (courseDto.category)
      course.setCategory(
        CourseCategory.create({ category: courseDto.category })
      );

    if (courseDto.subCategory)
      course.setSubCategory(
        CourseSubCategory.create({ subCategory: courseDto.subCategory })
      );

    if (courseDto.imgSrc) course.setImgSrc(courseDto.imgSrc);

    if (courseDto.language)
      course.setLanguage(
        CourseLanguage.create({ language: courseDto.language })
      );

    if (courseDto.field)
      course.setField(CourseField.create({ field: courseDto.field }));

    if (courseDto.time) course.setTime(courseDto.time);

    if (courseDto.requirements)
      course.setRequirements(
        CourseRequirements.create({ requirements: courseDto.requirements })
      );
  }
}
