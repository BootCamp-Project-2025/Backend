import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface PostDescriptionProps {
  [description: string]: string;
}

export default class PostDescription extends ValueObject<PostDescriptionProps> {
  private constructor(props: PostDescriptionProps) {
    super(props);
  }

  public get value(): string {
    return this.props.status;
  }

  public static create(props: PostDescriptionProps): PostDescription {
    this.validateDescriptionOrThrowApiError(props.description);
    return new PostDescription(props);
  }

  private static validateDescriptionOrThrowApiError(description: string) {
    if (description.length > 1000) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "description must be shorter than 1000 characters"
      );
    }
  }
}
