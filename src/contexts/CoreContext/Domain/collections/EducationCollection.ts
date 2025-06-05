import { Education } from "../entities/Education";

export class EducationCollection {
  private readonly educations: Education[];

  private constructor(educations: Education[]) {
    if (educations.length > 5) {
      throw new Error("A freelancer can have up to 5 education entries.");
    }

    this.educations = educations;
  }

  public static create(educations: Education[]): EducationCollection {
    return new EducationCollection(educations);
  }

  public getItems(): Education[] {
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

//EducationCollection is a wrapper class that groups several Education entities, with its own logic to manage them.
