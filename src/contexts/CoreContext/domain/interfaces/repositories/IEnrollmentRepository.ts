import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { Enrollment } from "@/generated/prisma";

export interface IEnrollmentRepository extends IRepository<Enrollment> {
  cancelEnrollment(enrollmentId: string): Promise<void>;
}
