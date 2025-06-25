import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { Course } from "../../domain/aggregates/Course";
import prismaClient from "../../../Shared/infrastrucutre/database/prismaClient"; // askDaniel
import { CourseMapper } from "../../mappers/CourseMapper";
import { injectable } from "tsyringe";

@injectable()
export class CourseRepository implements ICourseRepository {
  async findById(id: string): Promise<Course | null> {
    const course = await prismaClient.course.findUnique({
      where: { id },
    });

    if (!course) return null;

    return CourseMapper.todomain(course);
  }

  async findAll(): Promise<Course[]> {
    const courses = await prismaClient.course.findMany();
    return courses.map(CourseMapper.todomain);
  }

  async insert(course: Course): Promise<Course> {
    const data = CourseMapper.toPersistence(course);
    const created = await prismaClient.course.create({ data });
    return CourseMapper.todomain(created);
  }
}
