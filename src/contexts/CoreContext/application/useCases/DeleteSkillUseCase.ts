import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Skill } from "../../domain/valueObjects/Skill";

type props = {
  skill: Skill;
  freelancerId: string;
};
export default class DeleteSkillUseCase implements IUseCase<props, Skill> {
  execute({ skill, freelancerId }: props): Promise<Skill> {
    console.log(skill, freelancerId);
    throw new Error("Method not implemented.");
  }
}
