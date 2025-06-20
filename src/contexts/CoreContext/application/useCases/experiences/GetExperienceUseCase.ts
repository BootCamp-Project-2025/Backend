import { Experience } from "@/contexts/CoreContext/domain/entities/Experience";
import { IExperienceRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IExperienceRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetExperiencesUseCase implements IUseCase<string, Experience[]> {
  constructor(
    @inject("IExperienceRepository")
    private repo: IExperienceRepository
  ) {}

  async execute(freelancerId: string): Promise<Experience[]> {
    return await this.repo.getAll(freelancerId);
  }
}
