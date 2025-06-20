import { Experience } from "../../entities/Experience";

export interface IExperienceRepository {
  findByFreelancerId(freelancerId: string): Promise<Experience[]>;
  findById(experienceId: string): Promise<Experience | null>;
  create(experience: Experience, freelancerId: string): Promise<void>;
  update(
    experienceId: string,
    experience: Experience,
    freelancerId: string
  ): Promise<void>;
  delete(experienceId: string): Promise<void>;
}
