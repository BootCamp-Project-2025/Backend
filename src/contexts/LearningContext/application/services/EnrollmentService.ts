import { IEnrollmentService } from "../../domain/interfaces/IEnrollmentService";
import { injectable, inject } from "tsyringe";
import IUseCase from "../../domain/interfaces/IUseCase";

@injectable()
export class EnrollmentService implements IEnrollmentService {
  constructor(
    @inject("EnrollInCourseUseCase")
    private readonly enrollInCourseUseCase: IUseCase<
      { courseId: string; userId: string },
      void
    >
  ) {}

  async enrollInCourse(courseId: string, userId: string): Promise<void> {
    await this.enrollInCourseUseCase.execute({ courseId, userId });
  }
}
