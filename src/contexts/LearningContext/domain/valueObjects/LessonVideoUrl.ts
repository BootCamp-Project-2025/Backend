import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface LessonVideoUrlProps {
  [url: string]: string;
}

export class LessonVideoUrl extends ValueObject<LessonVideoUrlProps> {
  private constructor(props: LessonVideoUrlProps) {
    super(props);
  }

  public get value(): string {
    return this.props.url;
  }

  public static create(props: LessonVideoUrlProps): LessonVideoUrl {
    if (!props.url || typeof props.url !== "string") {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid url value");
    }
    return new LessonVideoUrl(props);
  }
}
