import { ManyRelationship } from "@/contexts/Shared/domain/ManyRelationship";
import { Skill } from "../entities/Skill";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export class Skills extends ManyRelationship<Skill> {
  private static readonly MAX_SKILLS = 10;

  private constructor(skills: Skill[]) {
    super(skills);
  }

  compareItems(a: Skill, b: Skill): boolean {
    return a.equals(b);
  }

  public static create(skills: Skill[] = []): Skills {
    if (skills.length > this.MAX_SKILLS) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        `A freelancer can have at most ${this.MAX_SKILLS} skills.`
      );
    }

    return new Skills(skills);
  }

  public add(skill: Skill): void {
    if (this.getItems().length >= Skills.MAX_SKILLS) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "You can't add more than 10 skills."
      );
    }

    if (!this.exists(skill)) {
      super.add(skill);
    }
  }

  public remove(skill: Skill): void {
    super.remove(skill);
  }

  public edit(editedSkill: Skill): void {
    const index = this.getItems().findIndex((skill) =>
      skill.id.equals(editedSkill.id)
    );
    if (index === -1)
      throw new ApiError(StatusCodes.CONTINUE, "experience doesnt exist");
    super.edit(editedSkill, index);
  }
}
