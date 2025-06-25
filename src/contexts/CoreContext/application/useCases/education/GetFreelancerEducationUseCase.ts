/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Education } from "@/contexts/CoreContext/domain/entities/Education";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { injectable } from "tsyringe";

export interface IGetFreelancerEducationUseCase
  extends IUseCase<UniqueEntityID, Education[]> {}

@injectable()
export class GetFreelancerEducationUseCase
  implements IGetFreelancerEducationUseCase
{
  execute(
    params?: UniqueEntityID | undefined
  ): Education[] | Promise<Education[]> {
    throw new Error("Method not implemented.");
  }
}
