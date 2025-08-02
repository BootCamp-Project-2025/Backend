import { inject, injectable } from "tsyringe";
import { IStudentTrackProgressRepository } from "../../../domain/interfaces/IStudentTrackProgressRepository";
import IUseCase from "../../../domain/interfaces/IUseCase";
import { StudentTrackProgress } from "../../../domain/entities/StudentTrackProgress";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class GetStudentTrackProgressByEnrollmentUseCase
  implements IUseCase<{ enrollmentId: string }, StudentTrackProgress[]>
{
  constructor(
    @inject("IStudentTrackProgressRepository")
    private readonly repository: IStudentTrackProgressRepository
  ) {}

  async execute({
    enrollmentId,
  }: {
    enrollmentId: string;
  }): Promise<StudentTrackProgress[]> {
    const result = await this.repository.findByEnrollment(enrollmentId);
    if (result.length === 0) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        "Student track progress not found"
      );
    }
    return result;
  }
}
