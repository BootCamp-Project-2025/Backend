import { Experience } from "../../entities/Experience";

export interface IExperienceRepository {
  getAll(freelancerId: string): Promise<Experience[]>;
  findById(experienceId: string): Promise<Experience | null>;
  create(experience: Experience, freelancerId: string): Promise<Experience>;
  update(
    experienceId: string,
    experience: Experience,
    freelancerId: string
  ): Promise<Experience>;
  delete(experienceId: string): Promise<void>;
}
