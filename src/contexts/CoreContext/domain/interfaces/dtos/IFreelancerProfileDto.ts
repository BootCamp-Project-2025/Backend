import { Education } from "../../entities/Education";
import { Experience } from "../../entities/Experience";
import { Certification } from "../../valueObjects/Certification";
import { Language } from "../../valueObjects/Language";
import { Skill } from "../../valueObjects/Skill";

export interface IFreelancerProfileDto {
  about: string;
  skills?: Skill[];
  languages?: Language[];
  education?: Education[];
  experience?: Experience[];
  certifications?: Certification[];
}
