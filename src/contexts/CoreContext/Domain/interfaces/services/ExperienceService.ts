import { Experience } from "../../Entities/Experience";

export class ExperienceService {
  private readonly experiences: Experience[];

  private constructor(experiences: Experience[]) {
    if (experiences.length > 10) {
      throw new Error("A freelancer cannot have more than 10 experiences.");
    }
    this.experiences = experiences;
  }

  public static create(experiences: Experience[] = []): ExperienceService {
    return new ExperienceService(experiences);
  }

  public getAll(): Experience[] {
    return this.experiences;
  }

  public add(experience: Experience): void {
    if (this.experiences.length >= 10) {
      throw new Error("Maximum number of experiences reached.");
    }
    this.experiences.push(experience);
  }

  public removeById(id: string): void {
    const index = this.experiences.findIndex(
      (exp) => exp.experienceId.toString() === id
    );
    if (index === -1) {
      throw new Error("Experience not found.");
    }
    this.experiences.splice(index, 1);
  }

  public count(): number {
    return this.experiences.length;
  }
}
