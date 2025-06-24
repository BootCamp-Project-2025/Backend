import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Education } from "@/generated/prisma";

export default class DeleteEducationUseCase
  implements IUseCase<Education, void>
{
  execute(education: Education): void | Promise<void> {
    throw new Error("Method not implemented.");
  }
}
