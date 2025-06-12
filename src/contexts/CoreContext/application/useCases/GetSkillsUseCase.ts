import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Skill } from "@/generated/prisma";

export default class GetSkillsUseCase implements IUseCase<string, Skill[]> {
  execute(params: string): Promise<Skill[]> {
    throw new Error("Method not implemented.");
  }
}
