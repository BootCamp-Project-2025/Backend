import { ManyRelationship } from "@/contexts/Shared/domain/ManyRelationship";
import { Experience } from "../entities/Experience";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export class Experiences extends ManyRelationship<Experience> {
  private constructor(experiences: Experience[]) {
    if (experiences.length > 10) {
      throw new Error("A freelancer cannot have more than 10 experiences.");
    }
    super(experiences);
  }

  compareItems(a: Experience, b: Experience): boolean {
    return a.equals(b);
  }

  public static create(experiences: Experience[] = []): Experiences {
    return new Experiences(experiences);
  }

  public add(experience: Experience): void {
    if (this.getItems().length >= 10) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        "Maximum number of experiences reached."
      );
    }
    super.add(experience);
  }

  public remove(experience: Experience): void {
    this.remove(experience);
  }

  public removeById(id: string): void {
    const index = this.getItems().findIndex((exp) => exp.id.toString() === id);
    if (index === -1) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Experience not found.");
    }
    super.remove(this.getItems()[index]);
  }

  public edit(editedExperience: Experience): void {
    const index = this.getItems().findIndex((exp) =>
      exp.id.equals(editedExperience.id)
    );
    if (index === -1)
      throw new ApiError(StatusCodes.CONTINUE, "experience doesnt exist");
    super.edit(editedExperience, index);
  }
}
