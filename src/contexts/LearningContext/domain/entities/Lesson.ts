import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Entity } from "../../../Shared/domain/Entity";
import { SyllabusSectionTitle } from "../valueObjects/SyllabusSectionTitle";
import { LessonDescription } from "../valueObjects/LessonDescription";
import { LessonResource } from "../valueObjects/LessonResource";
import { LessonVideoUrl } from "../valueObjects/LessonVideoUrl";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

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
    if (this.duplicates<LessonResource>(props.resources))
      throw new ApiError(StatusCodes.BAD_REQUEST, "resources are repeated");
    if (this.duplicates<LessonVideoUrl>(props.videoUrls))
      throw new ApiError(StatusCodes.BAD_REQUEST, "video urls are repeated");
    return new Lesson({ ...props }, id);
  }

  public static duplicates<T>(array: T[]) {
    const visited = new Set();
    for (const object of array) {
      const objectString = JSON.stringify(object);
      if (visited.has(objectString)) return true;
      visited.add(objectString);
    }
    return false;
  }

  public compareTo(other: Lesson): boolean {
    return (
      this.props.title.value === other.props.title.value &&
      this.props.description.value === other.props.description.value &&
      this.props.position === other.props.position &&
      this.props.videoUrls.toString() === other.props.videoUrls.toString() &&
      JSON.stringify(this.props.resources) ===
        JSON.stringify(other.props.resources)
    );
  }

  public updateResourcesUrl(urls: LessonResource[]) {
    this.props.resources = urls;
  }

  get id(): UniqueEntityID {
    return this._id;
  }
}
