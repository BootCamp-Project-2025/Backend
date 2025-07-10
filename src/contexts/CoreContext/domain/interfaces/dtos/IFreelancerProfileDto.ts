import ISkillDto from "./ISkillDto";
import { ILanguageDto } from "./ILanguageDto";
import { IEducationDto } from "./IEducationDto";
import { IExperienceDTO } from "./IExperienceDto";
import { IGetCertificationDTO } from "./certifications/IGetCertificationDto";

export interface IFreelancerProfileDto {
  id?: string;
  about: string;
  skills?: ISkillDto[];
  languages?: ILanguageDto[];
  education?: IEducationDto[];
  experience?: IExperienceDTO[];
  certifications?: IGetCertificationDTO[];
}
