import { injectable } from "tsyringe";
import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { Course } from "../../domain/aggregates/Course";
import prismaClient from "../../../Shared/infrastructure/database/PrismaClient"; // askDaniel
import { CourseMapper } from "../../mappers/CourseMapper";
import { User } from "@/contexts/CoreContext/domain/aggregates/User";

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
  // eslint-disable-next-line class-methods-use-this
  async update(course: Course): Promise<Course> {
    const data = CourseMapper.toPersistence(course);
    const updated = await prismaClient.course.update({
      where: { id: course.id.toString() },
      data,
    });
    return CourseMapper.toDomain(updated);
  }
  // eslint-disable-next-line class-methods-use-this
  async delete(id: string): Promise<void> {
    await prismaClient.course.delete({ where: { id } });
  }
  // eslint-disable-next-line class-methods-use-this
  async enrollInCourse(course: Course, user: User): Promise<void> {
    const enrollment = await prismaClient.enrollment.create({
      data: {
        courseId: course.id.toString(),
        userId: user.id.toString(),
      },
    });

    if (!enrollment) {
      throw new Error("Enrollment failed CourseRepository.enrollInCourse");
    }
  }
  // eslint-disable-next-line class-methods-use-this
  async isUserEnrolled(courseId: string, userId: string): Promise<boolean> {
    const enrollment = await prismaClient.enrollment.findFirst({
      where: {
        courseId,
        userId,
      },
    });
    return Boolean(enrollment);
  }
}
