/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Education } from "@/contexts/CoreContext/domain/entities/Education";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { injectable } from "tsyringe";

export interface ICreateFreelancerEducationUseCase
  extends IUseCase<
    { freelancerId: UniqueEntityID; education: Education },
    Education
  > {}

@injectable()
export class CreateFreelancerEducationUseCase
  implements ICreateFreelancerEducationUseCase
{
  execute(
    params?: { freelancerId: UniqueEntityID; education: Education } | undefined
  ): Education | Promise<Education> {
    throw new Error("Method not implemented.");
  }
}
