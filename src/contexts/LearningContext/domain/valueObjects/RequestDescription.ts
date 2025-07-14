import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface RequestDescriptionProps {
  [description: string]: string;
}

export class RequestDescription extends ValueObject<RequestDescriptionProps> {
  private constructor(props: RequestDescriptionProps) {
    super(props);
  }

  public get value(): string {
    return this.props.description;
  }

  public static create(props: RequestDescriptionProps): RequestDescription {
    if (!props.description || typeof props.description !== "string") {
      throw new Error("Invlaid request description");
    }

    if (props.description.trim() === "") {
      throw new Error("Request description cannot be empty");
    }

    if (props.title.length > 100) {
      throw new Error("Request description cannot exceed 100 characters");
    }

    return new RequestDescription(props);
  }

  public static default(): RequestDescription {
    return new RequestDescription({ description: "General description" });
  }
}
