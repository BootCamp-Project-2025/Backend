import { Enrollment } from "@/generated/prisma";

export interface IEnrollmentService {
  create(enrollment: Enrollment): Promise<void>;
  cancel(enrollmentId: string): Promise<void>;
}
