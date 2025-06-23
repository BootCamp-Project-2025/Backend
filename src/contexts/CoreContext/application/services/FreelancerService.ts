import { inject, injectable } from "tsyringe";
import { IFreelancerService } from "../../domain/interfaces/services/IFreelancerService";
import { Skill } from "../../domain/entities/Skill";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { About } from "../../domain/valueObjects/About";
import GetAboutUseCase from "../useCases/GetAboutUseCase";
import UpdateAboutUseCase from "../useCases/UpdateAboutUseCase";

@injectable()
@injectable()
export default class FreelancerService implements IFreelancerService {
  constructor(
    @inject("AddSkillUseCase")
    private readonly addSkillUseCase: IUseCase<Skill, Skill[]>,
    @inject("EditSkillUseCase")
    private readonly EditSkillUseCase: IUseCase<Skill, Skill>,
    @inject("DeleteSkillUseCase")
    private readonly deleteSkillUseCase: IUseCase<Skill, Skill>,
    @inject("GetSkillsUseCase")
    private getSkillsUseCase: IUseCase<string, Skill[]>,
    @inject("GetAboutUseCase")
    private readonly getAboutUseCase: GetAboutUseCase,
    @inject("UpdateAboutUseCase")
    private readonly updateAboutUseCase: UpdateAboutUseCase
  ) {}
  async editSkill(skill: Skill): Promise<Skill> {
    return await this.EditSkillUseCase.execute(skill);
  }
  async deleteSkill(skill: Skill): Promise<Skill> {
    return await this.deleteSkillUseCase.execute(skill);
  }
  async addSkill(skill: Skill): Promise<Skill[]> {
    return this.addSkillUseCase.execute(skill);
  }
  async getSkills(freelancerId: string): Promise<Skill[]> {
    return this.getSkillsUseCase.execute(freelancerId);
  }
  async getAbout(freelancerId: string): Promise<About> {
    return this.getAboutUseCase.execute(freelancerId);
  }

  async updateAbout(freelancerId: string, about: About): Promise<About> {
    await this.updateAboutUseCase.execute({ freelancerId, about });
    return about;
  }
}
