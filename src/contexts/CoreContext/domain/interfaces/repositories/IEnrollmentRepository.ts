import { Enrollment } from "../../aggregates/Enrollment";

export interface IEnrollmentRepository {
  cancelEnrollment(enrollment: Enrollment): Promise<void>;
  create(enrollment: Enrollment): Promise<Enrollment>;
}
