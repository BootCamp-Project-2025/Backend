import "reflect-metadata";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import IEducationRepository from "../../domain/interfaces/repositories/IEducationRepository";
import { Education } from "../../domain/entities/Education";
import { inject, injectable } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class AddEducationUseCase
  implements IUseCase<Education, Education>
{
  constructor(
    @inject("EducationRepository")
    private educationRepository: IEducationRepository
  ) {}

  async execute(education: Education): Promise<Education> {
    try {
      return await this.educationRepository.add(education);
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
}
