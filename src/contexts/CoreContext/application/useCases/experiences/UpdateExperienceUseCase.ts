import { Experience } from "@/contexts/CoreContext/domain/entities/Experience";
import { IExperienceRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IExperienceRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateExperienceUseCase
  implements
    IUseCase<
      {
        experienceId: string;
        experience: Experience;
        freelancerId: string;
      },
      void
    >
{
  constructor(
    @inject("IExperienceRepository")
    private experienceRepository: IExperienceRepository
  ) {}

  async execute(params: {
    experienceId: string;
    experience: Experience;
    freelancerId: string;
  }): Promise<void> {
    const { experienceId, experience, freelancerId } = params;
    await this.experienceRepository.update(
      experienceId,
      experience,
      freelancerId
    );
  }
}
