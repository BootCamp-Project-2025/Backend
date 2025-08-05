import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface PostTitleProps {
  [title: string]: string;
}

export default class PostTitle extends ValueObject<PostTitleProps> {
  private constructor(props: PostTitleProps) {
    super(props);
  }

  public get value(): string {
    return this.props.title;
  }

  public static create(props: PostTitleProps): PostTitle {
    this.validateTitleOrThrowApiError(props.title);
    return new PostTitle(props);
  }

  private static validateTitleOrThrowApiError(title: string) {
    if (title.length < 5) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Title must be larger than 5 characters"
      );
    }
    if (title.length > 50) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Title must be shorter than 50 characters"
      );
    }
  }
}
