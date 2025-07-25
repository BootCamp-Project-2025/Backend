import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface PostUrlProps {
  [url: string]: string;
}

export default class PostUrl extends ValueObject<PostUrlProps> {
  private constructor(props: PostUrlProps) {
    super(props);
  }

  public get value(): string {
    return this.props.status;
  }

  public static create(props: PostUrlProps): PostUrl {
    if (!this.isAValidUrl(props.url)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Url is not valid");
    }
    return new PostUrl(props);
  }

  private static isAValidUrl(url: string) {
    try {
      return new URL(url) !== undefined;
    } catch {
      return false;
    }
  }
}
