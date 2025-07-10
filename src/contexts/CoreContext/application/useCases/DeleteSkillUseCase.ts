import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import { ISkillRepository } from "../../domain/interfaces/repositories/ISkillRepository";
import { DeleteSkillDto } from "../../domain/interfaces/dtos/DeleteSkillDto";

@injectable()
export default class DeleteSkillUseCase
  implements IUseCase<DeleteSkillDto, void>
{
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository,
    @inject("ISkillRepository")
    private skillRepository: ISkillRepository
  ) {}
  async execute({ skillId, freelancerId }: DeleteSkillDto): Promise<void> {
    try {
      const freelancer: Freelancer | null =
        await this.freelancerRepository.getById(freelancerId);
      if (freelancer === null)
        throw new ApiError(
          StatusCodes.CONFLICT,
          "the freelancer profile doesnt exist"
        );

      const skills = freelancer.skills.getItems();
      const skill = skills.find((row) => row.id.toString() === skillId);

      if (!skill) {
        throw new ApiError(StatusCodes.NOT_FOUND, "the skill doesnt exist");
      }
      freelancer.skills.remove(skill);
      await this.skillRepository.delete(skill.id.toString());
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
}
