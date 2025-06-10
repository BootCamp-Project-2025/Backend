import { Experience } from "../../entities/Experience";

export interface IExperienceService {
  getAll(): Experience[];
  add(experience: Experience): void;
  removeById(id: string): void;
  count(): number;
}
