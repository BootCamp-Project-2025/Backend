import { injectable } from "tsyringe";
import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { Course } from "../../domain/aggregates/Course";
import prismaClient from "../../../Shared/infrastructure/database/PrismaClient"; // askDaniel
import { CourseMapper } from "../../mappers/CourseMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export class CourseRepository implements ICourseRepository {
  async delete(courseId: string): Promise<void> {
    try {
      await prismaClient.course.delete({ where: { id: courseId } });
    } catch (error) {
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error in repository"
      );
    }
  }

  async update(courseDomain: Course): Promise<Course> {
    try {
      const courseDb = CourseMapper.toPersistence(courseDomain);
      const course = await prismaClient.course.update({
        where: { id: courseDomain.id.toString() },
        data: courseDb,
      });
      return CourseMapper.toDomain(course);
    } catch (error) {
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error in repository"
      );
    }
  }

  async findById(id: string): Promise<Course | null> {
    try {
      const course = await prismaClient.course.findUnique({
        where: { id: id },
      });

      if (!course) return null;

      return CourseMapper.toDomain(course);
    } catch (error) {
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error in repository"
      );
    }
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
}
