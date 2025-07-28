import { inject, injectable } from "tsyringe";
import { IStudentTrackProgressRepository } from "../../../domain/interfaces/IStudentTrackProgressRepository";
import IUseCase from "../../../domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class DeleteStudentTrackProgressUseCase
  implements IUseCase<string, void>
{
  constructor(
    @inject("IStudentTrackProgressRepository")
    private readonly trackRepository: IStudentTrackProgressRepository
  ) {}

  async execute(id: string): Promise<void> {
    try {
      const existing = await this.trackRepository.findById(id);
      if (!existing)
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          "StudentTrackProgress not found"
        );
      await this.trackRepository.delete(id);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error executing the delete"
      );
    }
  }
}
