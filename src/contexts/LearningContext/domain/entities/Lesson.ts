import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Entity } from "../../../Shared/domain/Entity";

export type LessonResource = {
  name: string;
  url: string;
};

interface LessonProps {
  title: string;
  description: string;
  resources: LessonResource[];
  videoUrls: string[];
}

export class Lesson extends Entity<LessonProps> {
  private constructor(props: LessonProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: LessonProps, id?: UniqueEntityID): Lesson {
    return new Lesson({ ...props }, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }
}
