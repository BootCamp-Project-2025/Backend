import { Experience } from "../../entities/Experience";

export interface IExperiences {
  getAll(): Experience[];
  add(experience: Experience): void;
  removeById(id: string): void;
  count(): number;
}
