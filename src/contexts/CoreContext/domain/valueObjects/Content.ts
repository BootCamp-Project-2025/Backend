import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface ContentProps {
  value: string;
}

export class Content extends ValueObject<ContentProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: ContentProps) {
    super(props);
  }

  private static isValidContent(content: string): boolean {
    return content.trim().length > 50 && content.trim().length < 200;
  }

  public static create(content: string | null | undefined) {
    if (!content) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Description required");
    }

    if (!this.isValidContent(content)) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Invalid description: must be between 50 and 200 characters long"
      );
    }

    return new Content({ value: content });
  }
}
