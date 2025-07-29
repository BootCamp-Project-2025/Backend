import { IEnrollmentService } from "../../domain/interfaces/services/IEnrollmentService";
import { inject, injectable } from "tsyringe";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Enrollment } from "../../domain/aggregates/Enrollment";

@injectable()
export class EnrollmentService implements IEnrollmentService {
  constructor(
    @inject("CreateEnrollmentUseCase")
    private createEnrollmentUseCase: IUseCase<Enrollment, Enrollment>,
    @inject("CancelEnrollmentUseCase")
    private cancelEnrollmentUseCAse: IUseCase<{ enrollmentId: string }, void>,
    @inject("CheckEnrollmentUseCase")
    private checkEnrollmentUseCase: IUseCase<
      { userId: string; courseId: string },
      Enrollment | null
    >
  ) {}

  async create(enrollment: Enrollment): Promise<Enrollment> {
    return await this.createEnrollmentUseCase.execute(enrollment);
  }
  async cancel(enrollmentId: string): Promise<void> {
    await this.cancelEnrollmentUseCAse.execute({ enrollmentId });
  }
  async checkEnrollment(
    userId: string,
    courseId: string
  ): Promise<Enrollment | null> {
    return await this.checkEnrollmentUseCase.execute({ userId, courseId });
  }
}
