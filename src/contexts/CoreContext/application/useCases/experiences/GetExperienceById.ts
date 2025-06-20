import { Experience } from "@/contexts/CoreContext/domain/entities/Experience";
import { IExperienceRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IExperienceRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetExperienceByIdUseCase
  implements IUseCase<string, Experience | null>
{
  constructor(
    @inject("IExperienceRepository")
    private experienceRepository: IExperienceRepository
  ) {}

  async execute(experienceId: string): Promise<Experience | null> {
    return await this.experienceRepository.findById(experienceId);
  }
}
