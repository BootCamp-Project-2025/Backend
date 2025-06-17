import { inject, injectable } from "tsyringe";
import { IFreelancerService } from "../../domain/interfaces/services/IFreelancerService";
import { Skill } from "../../domain/valueObjects/Skill";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { CreateSkillDto } from "../../domain/interfaces/dtos/CreateSkillDto";

@injectable()
export default class FreelancerService implements IFreelancerService {
  constructor(
    @inject("AddSkillUseCase")
    private readonly addSkillUseCase: IUseCase<CreateSkillDto, Skill[]>,
    @inject("EditSkillUseCase")
    private readonly EditSkillUseCase: IUseCase<CreateSkillDto, Skill>,
    @inject("DeleteSkillUseCase")
    private readonly deleteSkillUseCase: IUseCase<CreateSkillDto, Skill>,
    @inject("GetSkillsUseCase")
    private getSkillsUseCase: IUseCase<string, Skill[]>
  ) {}
  async editSkill(skill: Skill, freelancerId: string): Promise<Skill> {
    return await this.EditSkillUseCase.execute({
      skill: skill,
      freelancerId: freelancerId,
    });
  }
  async deleteSkill(skill: Skill, freelancerId: string): Promise<Skill> {
    return await this.deleteSkillUseCase.execute({
      skill: skill,
      freelancerId: freelancerId,
    });
  }
  async addSkill(skill: Skill, freelancerId: string): Promise<Skill[]> {
    return this.addSkillUseCase.execute({
      skill: skill,
      freelancerId: freelancerId,
    });
  }
  async getSkills(freelancerId: string): Promise<Skill[]> {
    return this.getSkillsUseCase.execute(freelancerId);
  }
}
