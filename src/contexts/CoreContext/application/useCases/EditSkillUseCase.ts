import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Skill } from "../../domain/valueObjects/Skill";
import { CreateSkillDto } from "../../domain/interfaces/dtos/CreateSkillDto";
import { injectable } from "tsyringe";

@injectable()
export default class EditSkillUseCase
  implements IUseCase<CreateSkillDto, Skill>
{
  execute({ skill, freelancerId }: CreateSkillDto): Promise<Skill> {
    console.log(skill, freelancerId);
    throw Error("");
  }
}
