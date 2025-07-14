import { Enrollment } from "../../aggregates/Enrollment";

export interface IEnrollmentService {
  create(enrollment: Enrollment): Promise<Enrollment>;
  cancel(enrollmentId: string): Promise<void>;
}
