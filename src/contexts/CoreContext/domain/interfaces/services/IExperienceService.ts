import { ExperienceDTO } from "../dtos/IExperienceDto";

/* export interface IExperiences {
  getAll(): Experience[];
  add(experience: Experience): void;
  removeById(id: string): void;
  count(): number;
}
 */

export interface IExperiences {
  getAll(id: string): Promise<ExperienceDTO[]>;
  create(
    experience: ExperienceDTO,
    freelancerId: string
  ): Promise<ExperienceDTO>;
  delete(experienceId: string): Promise<void>;
  update(
    experienceId: string,
    experience: ExperienceDTO,
    freelancerId: string
  ): Promise<void>;
  getById(experienceId: string): Promise<ExperienceDTO | null>;
}
