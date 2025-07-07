import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export type LessonResourceProps = {
  name: string;
  url: string;
};
export class LessonResource extends ValueObject<LessonResourceProps> {
  private constructor(props: LessonResourceProps) {
    super(props);
  }

  public get name(): string {
    return this.props.name;
  }

  public get url(): string {
    return this.props.url;
  }

  public get value(): LessonResourceProps {
    return this.props;
  }

  public static create(props: LessonResourceProps): LessonResource {
    if (!props.name || typeof props.name !== "string")
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid name value");
    if (!props.url || typeof props.url !== "string")
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid name value");
    return new LessonResource(props);
  }
}
