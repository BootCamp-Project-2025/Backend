import { inject, injectable } from "tsyringe";
import { IStudentTrackProgressRepository } from "../../../domain/interfaces/IStudentTrackProgressRepository";
import IUseCase from "../../../domain/interfaces/IUseCase";
import { StudentTrackProgress } from "../../../domain/entities/StudentTrackProgress";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class UpdateStudentTrackProgressUseCase
  implements IUseCase<StudentTrackProgress, void>
{
  constructor(
    @inject("IStudentTrackProgressRepository")
    private readonly trackRepository: IStudentTrackProgressRepository
  ) {}

  async execute(trackProgress: StudentTrackProgress): Promise<void> {
    try {
      const existing = await this.trackRepository.findById(
        trackProgress.id.toString()
      );
      if (!existing)
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          "StudentTrackProgress not found"
        );
      return await this.trackRepository.update(trackProgress);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error executing the update"
      );
    }
  }
}
