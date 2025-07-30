import { Enrollment } from "@/contexts/CoreContext/domain/aggregates/Enrollment";
import { IEnrollmentRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IEnrollmentRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetEnrollmentByIdUseCase implements IUseCase<string, Enrollment> {
  constructor(
    @inject("IEnrollmentRepository")
    private enrollmentRepository: IEnrollmentRepository
  ) {}

  async execute(enrollmentId: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findById(enrollmentId);

    if (!enrollment) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Enrollment not found");
    }

    return enrollment;
  }
}
