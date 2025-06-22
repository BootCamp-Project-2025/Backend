import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { About } from "../../domain/valueObjects/About";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { IAboutRepository } from "../../domain/interfaces/repositories/IAboutRepository";

@injectable()
export default class GetAboutUseCase implements IUseCase<string, About> {
  constructor(
    @inject("IAboutRepository")
    private aboutRepository: IAboutRepository
  ) {}

  execute(freelancerId: string): Promise<About> {
    try {
      return this.aboutRepository.get(freelancerId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Server error getting About"
      );
    }
  }
}
