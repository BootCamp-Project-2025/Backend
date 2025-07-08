import { injectable } from "tsyringe";
import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { Course } from "../../domain/aggregates/Course";
import prismaClient from "../../../Shared/infrastructure/database/PrismaClient"; // askDaniel
import { CourseMapper } from "../../mappers/CourseMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import PrismaClient from "../../../Shared/infrastructure/database/PrismaClient";

@injectable()
export class CourseRepository implements ICourseRepository {
  async findById(id: string): Promise<Course | null> {
    const course = await prismaClient.course.findUnique({
      where: { id },
    });

    if (!course) return null;

    return CourseMapper.toDomain(course);
  }

  async findAll(): Promise<Course[]> {
    const courses = await prismaClient.course.findMany();
    return courses.map(CourseMapper.toDomain);
  }

  async insert(course: Course): Promise<Course> {
    const data = CourseMapper.toPersistence(course);
    const created = await prismaClient.course.create({ data });
    return CourseMapper.toDomain(created);
  }

  async publish(id: string): Promise<boolean> {
    try {
      await PrismaClient.course.update({
        data: { published: true },
        where: { id: id },
      });
      return true;
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error saving the changes"
      );
    }
  }
}
