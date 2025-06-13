import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Skill } from "../../domain/valueObjects/Skill";
import { inject, injectable } from "tsyringe";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { CreateSkillDto } from "../../domain/interfaces/dtos/CreateSkillDto";

@injectable()
export default class AddSkillUseCase
  implements IUseCase<CreateSkillDto, Skill>
{
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}
  async execute({ skill, freelancerId }: CreateSkillDto): Promise<Skill> {
    return this.freelancerRepository.addSkill(freelancerId, skill);
  }
}
