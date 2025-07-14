import { IEnrollmentRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IEnrollmentRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class CancelEnrollmentUseCase
  implements IUseCase<{ enrollmentId: string }, void> {
  constructor(
    @inject("IEnrollmentRepository")
    private enrollmentRepository: IEnrollmentRepository
  ) { }

  async execute(params: { enrollmentId: string }): Promise<void> {
    const enrollment = await this.enrollmentRepository.findById(
      params.enrollmentId
    );
    if (!enrollment)
      throw new ApiError(StatusCodes.NOT_FOUND, "Enrollment not found");
    enrollment.cancel();
    await this.enrollmentRepository.cancelEnrollment(enrollment);
  }
}
