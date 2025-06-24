import { SkillLevel } from "../../entities/Skill";

export type FreelancerDao = {
  userId: string;
  id: string;
  about: string;
  skills: {
    name: string;
    id: string;
    level: SkillLevel;
    freelancerId: string;
  }[];
  languages: {
    name: string;
    id: string;
    level: string;
    freelancerId: string;
  }[];
  education: {
    id: string;
    freelancerId: string;
    career: string;
    university: string;
    startDate: Date;
    endDate: Date;
  }[];
  experience: {
    id: string;
    freelancerId: string;
    startDate: Date;
    endDate: Date;
    position: string;
    employer: string;
    country: string;
    description: string;
  }[];
  certifications: {
    id: string;
    freelancerId: string;
    certification: string;
    institution: string;
    year: Date;
  }[];
};
