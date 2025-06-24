import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import { ISkillRepository } from "../../domain/interfaces/repositories/ISkillRepository";
import { Skill } from "../../domain/entities/Skill";

@injectable()
export default class EditSkillUseCase implements IUseCase<Skill, Skill> {
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository,
    @inject("ISkillRepository")
    private skillRepository: ISkillRepository
  ) {}
  async execute(skill: Skill): Promise<Skill> {
    try {
      const freelancer: Freelancer | null =
        await this.freelancerRepository.getById(skill.freelancerId);
      if (freelancer === null)
        throw new ApiError(
          StatusCodes.CONFLICT,
          "the freelancer profile doesnt exist"
        );
      if (!freelancer.skills.exists(skill))
        throw new ApiError(StatusCodes.BAD_REQUEST, "the skill doesnt exist");
      freelancer.skills.edit(skill);
      const savedSkill = await this.skillRepository.update(
        freelancer.skills.getItems()[0].id.toString(),
        freelancer.skills.getItems()[0]
      );
      if (savedSkill === undefined)
        throw new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "skill couldnt be saved"
        );
      return savedSkill;
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
}
