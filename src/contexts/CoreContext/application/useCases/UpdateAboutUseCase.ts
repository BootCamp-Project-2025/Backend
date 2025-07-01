import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { About } from "../../domain/valueObjects/About";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { IAboutRepository } from "../../domain/interfaces/repositories/IAboutRepository";

type Input = {
  freelancerId: string;
  about: About;
};
@injectable()
export default class UpdateAboutUseCase implements IUseCase<Input, void> {
  constructor(
    @inject("IAboutRepository")
    private aboutRepository: IAboutRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const { freelancerId, about } = input;

    try {
      this.aboutRepository.update(freelancerId, about);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Server error updating About"
      );
    }
  }
}
