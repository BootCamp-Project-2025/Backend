import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { isAValidUrl } from "@/contexts/Shared/utils/UrlValidation";
import { StatusCodes } from "http-status-codes";

interface FilePostUrlProps {
  [url: string]: string;
}

export default class FilePostUrl extends ValueObject<FilePostUrlProps> {
  private constructor(props: FilePostUrlProps) {
    super(props);
  }

  public get value(): string {
    return this.props.url;
  }

  public static create(props: FilePostUrlProps): FilePostUrl {
    if (!isAValidUrl(props.url)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Url is not valid");
    }
    return new FilePostUrl(props);
  }
}
