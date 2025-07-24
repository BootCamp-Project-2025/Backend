import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface ChatNameProps {
  value: string;
}

export class ChatName extends ValueObject<ChatNameProps> {
  public static maxLength: number = 50;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: ChatNameProps) {
    super(props);
  }

  public static create(value: string): ChatName {
    if (value.length > this.maxLength) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        `Chat name must be less than ${this.maxLength} characters`
      );
    }

    return new ChatName({ value });
  }
}
