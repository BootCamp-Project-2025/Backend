import { IExperienceDTO } from "../dtos/IExperienceDto";

export interface IExperiences {
  getAll(freelancerId: string): Promise<IExperienceDTO[]>;
  getById(experienceId: string): Promise<IExperienceDTO>;
  create(dto: IExperienceDTO): Promise<IExperienceDTO>;
  update(dto: IExperienceDTO): Promise<IExperienceDTO>;
  delete(experienceId: string): Promise<void>;
}
