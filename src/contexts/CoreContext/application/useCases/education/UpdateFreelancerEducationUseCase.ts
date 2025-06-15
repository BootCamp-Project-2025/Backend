/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Education } from "@/contexts/CoreContext/domain/entities/Education";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { injectable } from "tsyringe";

export interface IUpdateFreelancerEducationUseCase
  extends IUseCase<{ id: UniqueEntityID; education: Education }, Education[]> {}

@injectable()
export class UpdateFreelancerEducationUseCase
  implements IUpdateFreelancerEducationUseCase
{
  execute(
    params?: { id: UniqueEntityID; education: Education } | undefined
  ): Education[] | Promise<Education[]> {
    throw new Error("Method not implemented.");
  }
}
