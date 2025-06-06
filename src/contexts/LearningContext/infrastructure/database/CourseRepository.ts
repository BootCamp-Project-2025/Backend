import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { Course } from "../../domain/aggregates/Course";
import prismaClient from "../../../Shared/infrastrucutre/database/prismaClient"; // askDaniel
import { CourseMapper } from "../../mappers/CourseMapper";
import { PrismaClient } from "@prisma/client";

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
    const created = await PrismaClient.course.create({ data });
    return CourseMapper.toDomain(created);
  }
}
