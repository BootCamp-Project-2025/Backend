import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { User } from "../../domain/aggregates/User";
import { Skill } from "../../domain/valueObjects/Skill";
type props = {
  skill: Skill;
  freelancerId: string;
};
export default class AddSkillUseCase implements IUseCase<props, User> {
  execute({ skill: Skill, freelancerId: string }): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
