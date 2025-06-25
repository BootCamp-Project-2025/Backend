import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import IEducationRepository from "../../domain/interfaces/repositories/IEducationRepository";
import { Education } from "../../domain/entities/Education";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { injectable, inject } from "tsyringe";

@injectable()
export default class EditEducationUseCase
  implements IUseCase<Education, Education>
{
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository,
    @inject("EducationRepository")
    private educationRepository: IEducationRepository
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(education: Education): Education | Promise<Education> {
    throw new Error("Method not implemented.");
  }
}
