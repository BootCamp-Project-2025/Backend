import { Enrollment } from "@/generated/prisma";

export interface IEnrollmentService {
  create(enrollment: Enrollment): Promise<void>;
  cancel(enrollmentId: string): Promise<void>;
  getById(enrollmentId: string): Promise<Enrollment | null>;
  getByUserId(userId: string): Promise<Enrollment[]>;
  getByCourseId(courseId: string): Promise<Enrollment[]>;
}
