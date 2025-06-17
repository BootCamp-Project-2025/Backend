import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Skill } from "../../domain/valueObjects/Skill";
import { inject, injectable } from "tsyringe";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { CreateSkillDto } from "../../domain/interfaces/dtos/CreateSkillDto";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class DeleteSkillUseCase
  implements IUseCase<CreateSkillDto, Skill>
{
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}
  async execute({ skill, freelancerId }: CreateSkillDto): Promise<Skill> {
    const skillID: string | undefined =
      await this.freelancerRepository.getSkillId(freelancerId, skill);
    if (skillID !== undefined) {
      return await this.freelancerRepository.deleteSkill(skillID);
    } else throw new ApiError(StatusCodes.CONFLICT, "the skill doesnt exist");
  }
}
