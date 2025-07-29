import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface userIdProps {
  [chatId: string]: string;
}

export default class ChatId extends ValueObject<userIdProps> {
  private constructor(props: userIdProps) {
    super(props);
  }

  public get value(): string {
    return this.props.status;
  }

  public static create(props: userIdProps): ChatId {
    this.validateTitleOrThrowApiError(props.chatId);
    return new ChatId(props);
  }

  private static validateTitleOrThrowApiError(chatId: string) {
    if (!chatId.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "chatId must not be empty");
    }
  }
}
