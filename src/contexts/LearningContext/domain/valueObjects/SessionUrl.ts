import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { isAValidUrl } from "@/contexts/Shared/utils/UrlValidation";
import { StatusCodes } from "http-status-codes";

interface SessionUrlProps {
  [url: string]: string;
}

export default class SessionUrl extends ValueObject<SessionUrlProps> {
  private constructor(props: SessionUrlProps) {
    super(props);
  }

  public get value(): string {
    return this.props.status;
  }

  public static create(props: SessionUrlProps): SessionUrl {
    if (!isAValidUrl(props.url)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Url is not valid");
    }
    return new SessionUrl(props);
  }
}
