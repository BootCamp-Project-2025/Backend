import { Education } from "../../entities/Education";
import { IEducationDto } from "../dtos/IEducationDto";

export interface IEducationService {
  getAllOfFreelancer(freelancerId: string): Promise<IEducationDto[]>;
  addEducation(education: IEducationDto): Promise<IEducationDto>;
  removeById(education: Education): Promise<void>;
  updateEducation(
    education: IEducationDto,
    freelancerId: string
  ): Promise<IEducationDto>;
}
