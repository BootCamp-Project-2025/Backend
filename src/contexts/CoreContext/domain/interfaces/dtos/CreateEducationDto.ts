import { Education } from "../../entities/Education";

export interface CreateEducationDto {
  education: Education;
  freelancerId: string;
}
