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
    private cancelEnrollmentUseCAse: IUseCase<{ enrollmentId: string }, void>
  ) {}

  async create(enrollment: Enrollment): Promise<Enrollment> {
    return await this.createEnrollmentUseCase.execute(enrollment);
  }
  async cancel(enrollmentId: string): Promise<void> {
    await this.cancelEnrollmentUseCAse.execute({ enrollmentId });
  }
}
