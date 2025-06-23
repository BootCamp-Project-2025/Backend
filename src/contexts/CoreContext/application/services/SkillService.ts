import { inject, injectable } from "tsyringe";
import { Skill } from "../../domain/entities/Skill";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ISkillService } from "../../domain/interfaces/services/ISkillService";
import ISkillDto from "../../domain/interfaces/dtos/ISkillDto";
import { skillMapper } from "../../mappers/SkillMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class SkillService implements ISkillService {
  constructor(
    @inject("AddSkillUseCase")
    private readonly addSkillUseCase: IUseCase<Skill, Skill[]>,
    @inject("EditSkillUseCase")
    private readonly EditSkillUseCase: IUseCase<Skill, Skill>,
    @inject("DeleteSkillUseCase")
    private readonly deleteSkillUseCase: IUseCase<Skill, Skill>,
    @inject("GetSkillsUseCase")
    private getSkillsUseCase: IUseCase<string, Skill[]>
  ) {}
  async editSkill(skill: Skill): Promise<void> {
    try {
      await this.EditSkillUseCase.execute(skill);
      return;
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
  async deleteSkill(skill: Skill): Promise<void> {
    try {
      await this.deleteSkillUseCase.execute(skill);
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
  async addSkill(skill: Skill): Promise<void> {
    try {
      await this.addSkillUseCase.execute(skill);
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
  async getSkills(freelancerId: string): Promise<ISkillDto[]> {
    try {
      return skillMapper.mapArrayDomainToDto(
        await this.getSkillsUseCase.execute(freelancerId)
      );
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
}
