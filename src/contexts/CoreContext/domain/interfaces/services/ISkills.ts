import { Skill } from "../../entities/Skill";

export interface ISkills {
  add(skill: Skill): void;
  remove(skill: Skill): void;
  contains(skill: Skill): boolean;
  getAll(): Skill[];
}
