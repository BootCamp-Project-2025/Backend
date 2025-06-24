import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Education } from "@/generated/prisma";

export default class GetEducationsUseCase
  implements IUseCase<string, Education[]>
{
  execute(freelancerId: string): Education[] | Promise<Education[]> {
    throw new Error("Method not implemented.");
  }
}
