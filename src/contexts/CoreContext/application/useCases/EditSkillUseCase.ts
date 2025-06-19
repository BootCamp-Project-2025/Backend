import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { CreateSkillDto } from "../../domain/interfaces/dtos/CreateSkillDto";
import { inject, injectable } from "tsyringe";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

@injectable()
export default class EditSkillUseCase
  implements IUseCase<CreateSkillDto, void>
{
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}
  async execute({ skill, freelancerId }: CreateSkillDto): Promise<void> {
    const skillId: string | undefined =
      await this.freelancerRepository.getSkillId(freelancerId, skill);
    if (skillId !== undefined) {
      await this.freelancerRepository.editSkill(skillId, skill);
    } else
      throw new ApiError(StatusCodes.BAD_REQUEST, "the skill doesnt exist");
  }
}
