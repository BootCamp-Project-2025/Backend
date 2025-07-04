import { ManyRelationship } from "@/contexts/Shared/domain/ManyRelationship";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Lesson } from "../entities/Lesson";

export class Lessons extends ManyRelationship<Lesson> {
  compareItems(a: Lesson, b: Lesson): boolean {
    return a.equals(b);
  }

  public static create(lessons: Lesson[] = []): Lessons {
    return new Lessons(lessons);
  }

  public edit(editedLesson: Lesson): void {
    const index = this.getItems().findIndex((module) =>
      module.id.equals(editedLesson.id)
    );

    super.edit(editedLesson, index);
  }

  public removeById(id: string): void {
    const index = this.getItems().findIndex((e) => e.id.toString() === id);
    if (index === -1)
      throw new ApiError(StatusCodes.CONTINUE, "lesson doesnt exist");
    super.remove(this.getItems()[index]);
  }
}
