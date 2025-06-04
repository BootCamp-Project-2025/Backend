import { PrismaClient } from "../../../../generated/prisma/client";
import { ICourseRepository } from "../../Domain/Interfaces/ICourseRepository";
import { Course } from "../../Domain/Aggregates/Course";
import { CourseMapper } from "../../Mappers/CourseMapper";

export class CourseRepository implements ICourseRepository {
  private prisma = new PrismaClient();

  async insert(course: Course): Promise<Course> {
    const data = CourseMapper.toPersistence(course);
    const created = await this.prisma.course.create({ data });
    return CourseMapper.toDomain(created);
  }
}
