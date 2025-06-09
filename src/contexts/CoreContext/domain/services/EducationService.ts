import { Education } from "../entities/Education";
import { IEducationService } from "../interfaces/services/IEducationService";

export class EducationService implements IEducationService {
  private readonly educations: Education[];

  private constructor(educations: Education[]) {
    if (educations.length > 5) {
      throw new Error("A freelancer can have up to 5 education entries.");
    }

    this.educations = educations;
  }

  public static create(educations: Education[] = []): EducationService {
    return new EducationService(educations);
  }

  public getAll(): Education[] {
    return [...this.educations];
  }

  public add(education: Education): void {
    if (this.educations.length >= 5) {
      throw new Error("Cannot add more than 5 education entries.");
    }

    this.educations.push(education);
  }

  public removeById(id: string): void {
    const index = this.educations.findIndex((e) => e.educationId === id);
    if (index !== -1) {
      this.educations.splice(index, 1);
    }
  }
}
