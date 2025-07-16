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
      if (!(await this.nameAvailable(courseDb.name, courseDb.id)))
        throw new ApiError(StatusCodes.CONFLICT, "name taken by other course");
      const course = await prismaClient.course.update({
        where: { id: courseDomain.id.toString() },
        data: courseDb,
      });
      return CourseMapper.toDomain(course);
    } catch (error) {
      if (error as ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error in repository"
      );
    }
  }

  async nameAvailable(name: string, id: string): Promise<boolean> {
    if (
      (await prismaClient.course.findFirst({
        where: { name: name, NOT: { id: id } },
      })) === null
    )
      return true;
    else return false;
  }

  async findById(id: string): Promise<Course | null> {
    try {
      const course = await prismaClient.course.findUnique({
        where: { id },
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
