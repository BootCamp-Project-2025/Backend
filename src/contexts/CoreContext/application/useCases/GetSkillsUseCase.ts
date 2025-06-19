import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Skill } from "../../domain/entities/Skill";
import { inject, injectable } from "tsyringe";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";

@injectable()
export default class GetSkillsUseCase implements IUseCase<string, Skill[]> {
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}
  execute(freelancerId: string): Promise<Skill[]> {
    return this.freelancerRepository.getSkills(freelancerId);
  }
}
