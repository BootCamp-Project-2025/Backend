import { Skill } from "../../entities/Skill";

export type CreateSkillDto = {
  skill: Skill;
  freelancerId: string;
};
