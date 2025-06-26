import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Skill } from "../../domain/entities/Skill";
import { inject, injectable } from "tsyringe";
import { ISkillRepository } from "../../domain/interfaces/repositories/ISkillRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class GetSkillsUseCase implements IUseCase<string, Skill[]> {
  constructor(
    @inject("ISkillRepository")
    private ISkillRepository: ISkillRepository
  ) {}
  execute(freelancerId: string): Promise<Skill[]> {
    try {
      return this.ISkillRepository.getSkillsById(freelancerId);
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
}
