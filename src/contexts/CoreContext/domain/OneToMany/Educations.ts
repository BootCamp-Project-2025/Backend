import { ManyRelationship } from "@/contexts/Shared/domain/ManyRelationship";
import { Education } from "../entities/Education";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

export class Educations extends ManyRelationship<Education> {
  private constructor(educations: Education[]) {
    if (educations.length > 5) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "A freelancer can have up to 5 education entries."
      );
    }

    super(educations);
  }

  compareItems(a: Education, b: Education): boolean {
    return a.equals(b);
  }

  public static create(educations: Education[] = []): Educations {
    return new Educations(educations);
  }

  public add(education: Education): void {
    if (this.getItems().length >= 5) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Cannot add more than 5 education entries."
      );
    }
    super.add(education);
  }

  public edit(editedEducation: Education): void {
    const index = this.getItems().findIndex((education) =>
      education.id.equals(editedEducation.id)
    );
    if (index === -1)
      throw new ApiError(StatusCodes.CONTINUE, "experience doesnt exist");
    super.edit(editedEducation, index);
  }

  public removeById(id: string): void {
    const index = this.getItems().findIndex((e) => e.educationId === id);
    if (index !== -1) {
      this.remove(this.getItems()[index]);
    }
  }

  public remove(education: Education): void {
    super.remove(education);
  }
}
