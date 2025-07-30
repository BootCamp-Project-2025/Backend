import { Enrollment } from "../../aggregates/Enrollment";

export interface IEnrollmentService {
  create(enrollment: Enrollment): Promise<Enrollment>;
  cancel(enrollmentId: string): Promise<void>;
  checkEnrollment(userId: string, courseId: string): Promise<Enrollment | null>;
  getEnrollments(userId: string): Promise<Enrollment[]>;
}
