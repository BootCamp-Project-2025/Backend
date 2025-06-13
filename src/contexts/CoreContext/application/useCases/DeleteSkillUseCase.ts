import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Skill } from "../../domain/valueObjects/Skill";

export default class DeleteSkillUseCase implements IUseCase<string, Skill> {
  execute(skillId: string): Promise<Skill> {
    console.log(skillId);
    throw new Error("Method not implemented.");
  }
}
