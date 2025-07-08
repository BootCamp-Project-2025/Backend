export interface IEnrollmentService {
  enrollInCourse(courseId: string, userId: string): Promise<void>;
}
