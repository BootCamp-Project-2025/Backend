import { Skill } from "../../valueObjects/Skill";

export type CreateSkillDto = {
  skill: Skill;
  freelancerId: string;
};
