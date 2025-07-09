import { inject, injectable } from "tsyringe";
import { Skill } from "../../domain/entities/Skill";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ISkillService } from "../../domain/interfaces/services/ISkillService";
import ISkillDto from "../../domain/interfaces/dtos/ISkillDto";
import { skillMapper } from "../../mappers/SkillMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { DeleteSkillDto } from "../../domain/interfaces/dtos/DeleteSkillDto";

@injectable()
export default class SkillService implements ISkillService {
  constructor(
    @inject("AddSkillUseCase")
    private readonly addSkillUseCase: IUseCase<Skill, Skill>,
    @inject("EditSkillUseCase")
    private readonly editSkillUseCase: IUseCase<Skill, Skill>,
    @inject("DeleteSkillUseCase")
    private readonly deleteSkillUseCase: IUseCase<DeleteSkillDto, void>,
    @inject("GetSkillsUseCase")
    private getSkillsUseCase: IUseCase<string, Skill[]>
  ) {}
  async editSkill(skill: Skill): Promise<ISkillDto> {
    try {
      return skillMapper.mapDomainToDto(
        await this.editSkillUseCase.execute(skill)
      );
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
  async deleteSkill(skillId: string, freelancerId: string): Promise<void> {
    try {
      await this.deleteSkillUseCase.execute({
        skillId: skillId,
        freelancerId: freelancerId,
      });
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
  async addSkill(skill: Skill): Promise<ISkillDto> {
    try {
      return skillMapper.mapDomainToDto(
        await this.addSkillUseCase.execute(skill)
      );
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
