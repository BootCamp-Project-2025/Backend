import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Education } from "@/generated/prisma";

export default class EditEducationUseCase
  implements IUseCase<Education, Education>
{
  execute(education: Education): Education | Promise<Education> {
    throw new Error("Method not implemented.");
  }
}
