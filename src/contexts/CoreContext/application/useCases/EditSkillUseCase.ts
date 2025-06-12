import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Skill } from "../../domain/valueObjects/Skill";

type props = {
  skill: Skill;
  freelancerId: string;
};
export default class EditSkillUseCase implements IUseCase<props, Skill> {
  execute({ skill: Skill, freelancerId: string }): Promise<Skill> {
    throw new Error("Method not implemented.");
  }
}
