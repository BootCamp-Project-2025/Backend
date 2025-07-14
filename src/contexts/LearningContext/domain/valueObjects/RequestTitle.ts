import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface RequestTitleProps {
  [title: string]: string;
}

export class RequestTitle extends ValueObject<RequestTitleProps> {
  private constructor(props: RequestTitleProps) {
    super(props);
  }

  public get value(): string {
    return this.props.title;
  }

  public static create(props: RequestTitleProps): RequestTitle {
    if (!props.title || typeof props.title !== "string") {
      throw new Error("Invlaid request title");
    }

    if (props.title.trim().length === 0) {
      throw new Error("Request title cannot be empty");
    }

    if (props.title.length > 100) {
      throw new Error("Request title cannot exceed 100 characters");
    }

    return new RequestTitle(props);
  }

  public static default(): RequestTitle {
    return new RequestTitle({ title: "General Request" });
  }
}
