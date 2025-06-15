/* eslint-disable @typescript-eslint/no-empty-object-type */
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { injectable } from "tsyringe";

export interface IDeleteFreelancerEducationUseCase
  extends IUseCase<UniqueEntityID, boolean> {}

@injectable()
export class DeleteFreelancerEducationUseCase
  implements IDeleteFreelancerEducationUseCase
{
  execute(params?: UniqueEntityID | undefined): boolean | Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
