import { IEnrollmentRepository } from "../../domain/interfaces/repositories/IEnrollmentRepository";
import { Enrollment } from "../../domain/aggregates/Enrollment";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { EnrollmentMapper } from "../../mappers/EnrollmentMapper";
import { EnrollmentStatus } from "@/generated/prisma";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { injectable } from "tsyringe";

injectable();
export class EnrollmentRepository implements IEnrollmentRepository {
  async create(object: Enrollment): Promise<Enrollment> {
    const enrollment = await PrismaClient.enrollment.create({
      data: {
        userId: object.userId.toString(),
        courseId: object.courseId.toString(),
        createdAt: object.createdAt,
        status: object.status as EnrollmentStatus,
      },
    });

    return EnrollmentMapper.persistanceToDomain(enrollment);
  }

  async cancelEnrollment(enrollment: Enrollment): Promise<void> {
    await PrismaClient.enrollment.update({
      where: { id: enrollment.id.toString() },
      data: { status: enrollment.status as EnrollmentStatus },
    });
  }
  async findById(enrollmentId: string): Promise<Enrollment> {
    const enrollment = await PrismaClient.enrollment.findUnique({
      where: {
        id: enrollmentId,
      },
    });
    if (!enrollment)
      throw new ApiError(StatusCodes.NOT_FOUND, "Enrollment not found");
    return EnrollmentMapper.persistanceToDomain(enrollment);
  }

  async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
    const enrollment = await PrismaClient.enrollment.findFirst({
      where: {
        userId: userId,
        courseId: courseId,
      },
    });

    return enrollment !== null;
  }
}
