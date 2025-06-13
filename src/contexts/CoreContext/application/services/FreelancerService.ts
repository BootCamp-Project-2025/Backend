import { inject, injectable } from "tsyringe";
import { IFreelancerService } from "../../domain/interfaces/services/IFreelancerService";
import { Skill } from "../../domain/valueObjects/Skill";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { CreateSkillDto } from "../../domain/interfaces/dtos/CreateSkillDto";

@injectable()
export default class FreelancerService implements IFreelancerService {
  constructor(
    @inject("AddSkillUseCase")
    private readonly addSkillUseCase: IUseCase<CreateSkillDto, Skill>,
    @inject("GetSkillsUseCase")
    private getSkillsUseCase: IUseCase<string, Skill[]>
  ) {}
  addSkill = async (skill: Skill, freelancerId: string): Promise<Skill> => {
    return this.addSkillUseCase.execute({
      skill: skill,
      freelancerId: freelancerId,
    });
  };
  getSkills = async (freelancerId: string): Promise<Skill[]> => {
    return this.getSkillsUseCase.execute(freelancerId);
  };
}
