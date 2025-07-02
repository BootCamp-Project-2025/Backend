import { IEducationDto } from "../dtos/IEducationDto";

export interface IEducationService {
  getAllOfFreelancer(freelancerId: string): Promise<IEducationDto[]>;
  addEducation(education: IEducationDto): Promise<IEducationDto>;
  removeById(id: string): Promise<void>;
}
