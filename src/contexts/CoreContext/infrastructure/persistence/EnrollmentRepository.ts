import { IEnrollmentRepository } from "../../domain/interfaces/repositories/IEnrollmentRepository";
import { Enrollment } from "../../domain/aggregates/Enrollment";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { EnrollmentMapper } from "../../mappers/EnrollmentMapper";
import { EnrollmentStatus } from "@/generated/prisma";

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
    try {
      await PrismaClient.enrollment.update({
        where: { id: enrollment.id.toString() },
        data: { status: enrollment.status as EnrollmentStatus },
      });
    } catch (error) {
      console.error("Error canceling enrollment:", error);
      throw new Error("Could not cancel enrollment");
    }
  }
}
