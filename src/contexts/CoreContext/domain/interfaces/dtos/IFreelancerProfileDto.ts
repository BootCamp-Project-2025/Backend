import { Education } from "../../entities/Education";
import { Experience } from "../../entities/Experience";
import { Certification } from "../../entities/Certification";
import { Language } from "../../entities/Language";
import { Skill } from "../../entities/Skill";

export interface IFreelancerProfileDto {
  about: string;
  skills?: Skill[];
  languages?: Language[];
  education?: Education[];
  experience?: Experience[];
  certifications?: Certification[];
}
