import { Enrollment } from "../../aggregates/Enrollment";

export interface IEnrollmentRepository {
  cancelEnrollment(enrollment: Enrollment): Promise<void>;
  create(enrollment: Enrollment): Promise<Enrollment>;
  findById(enrollmentId: string): Promise<Enrollment>;
  isUserEnrolled(userId: string, courseId: string): Promise<boolean>;
  getByUserId(userId: string): Promise<Enrollment[]>;
}
