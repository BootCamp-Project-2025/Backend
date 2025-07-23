import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export type ModuleQuizProps = {
  name: string;
  url: string;
};
export class ModuleQuiz extends ValueObject<ModuleQuizProps> {
  private constructor(props: ModuleQuizProps) {
    super(props);
  }

  public get name(): string {
    return this.props.name;
  }

  public get url(): string {
    return this.props.url;
  }

  public get value(): ModuleQuizProps {
    return this.props;
  }

  public static create(props: ModuleQuizProps): ModuleQuiz {
    if (!props.name || typeof props.name !== "string")
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid name value");
    if (!props.url || typeof props.url !== "string")
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid url value");
    return new ModuleQuiz(props);
  }
}
