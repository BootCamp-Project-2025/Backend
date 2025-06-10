import { Skill } from "../../valueObjects/Skill";

export interface ISkillService {
  add(skill: Skill): void;
  remove(skill: Skill): void;
  contains(skill: Skill): boolean;
  getAll(): Skill[];
}
