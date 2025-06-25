// import { IGetAllFreelancerEducationUseCase } from "../../application/useCases/education/IGetAllFreelancerEducationUseCase";
import { IGetAllFreelancerEducationUseCase } from "../../application/useCases/education/GetAllFreelancerEducationUseCase";
import { IGetFreelancerEducationUseCase } from "../../application/useCases/education/GetFreelancerEducationUseCase";
import { ICreateFreelancerEducationUseCase } from "../../application/useCases/education/CreateFreelancerEducationUseCase";
import { IUpdateFreelancerEducationUseCase } from "../../application/useCases/education/UpdateFreelancerEducationUseCase";
import { IDeleteFreelancerEducationUseCase } from "../../application/useCases/education/DeleteFreelancerEducationUseCase";

import { Education } from "../entities/Education";
import { IEducationService } from "../interfaces/services/IEducationService";
import { inject, injectable } from "tsyringe";

@injectable()
export class EducationService implements IEducationService {
  public constructor(
    @inject("GetAllFreelancerEducationUseCase")
    private readonly getAllEducationUseCase: IGetAllFreelancerEducationUseCase,
    @inject("GetFreelancerEducationUseCase")
    private readonly getEducationUseCase: IGetFreelancerEducationUseCase,
    @inject("CreateFreelancerEducationUseCase")
    private readonly createEducationUseCase: ICreateFreelancerEducationUseCase,
    @inject("UpdateFreelancerEducationUseCase")
    private readonly updateEducationUseCase: IUpdateFreelancerEducationUseCase,
    @inject("DeleteFreelancerEducationUseCase")
    private readonly deleteEducationUseCase: IDeleteFreelancerEducationUseCase
  ) {}
  getAll(): Promise<Education[]> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<Education | null> {
    throw new Error("Method not implemented.");
  }
  update(id: string, object: Education): Promise<Education> {
    throw new Error("Method not implemented.");
  }
  create(T: Education): Promise<Education> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
}
