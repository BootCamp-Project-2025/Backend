import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Entity } from "../../../Shared/domain/Entity";
import { SyllabusSectionTitle } from "../valueObjects/SyllabusSectionTitle";
import { LessonDescription } from "../valueObjects/LessonDescription";
import { LessonResource } from "../valueObjects/LessonResource";
import { LessonVideoUrl } from "../valueObjects/LessonVideoUrl";

interface LessonProps {
  title: SyllabusSectionTitle;
  description: LessonDescription;
  resources: LessonResource[];
  videoUrls: LessonVideoUrl[];
  position: number;
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
