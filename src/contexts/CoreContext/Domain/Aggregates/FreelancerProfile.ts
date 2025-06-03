import { Skill } from "../ValueObjects/Skill";
import { Language } from "../ValueObjects/Language";
import { Education } from "../Entities/Education";
import { Experience } from "../Entities/Experience";
import { Certification } from "../Entities/Certification";

export class FreelancerProfile {
  constructor(
    public readonly id: string,
    public fullName: string,
    public about: string,
    private skills: Skill[] = [],
    private languages: Language[] = [],
    private education: Education[] = [],
    private experience: Experience[] = [],
    private certifications: Certification[] = []
  ) {}

  addSkill(skill: Skill) {
    // if (!this.skills.some(s => s.equals(skill))) {}
    this.skills.push(skill);
  }
}
