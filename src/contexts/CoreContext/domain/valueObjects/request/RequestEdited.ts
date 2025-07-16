import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface EditedProps {
  value: boolean;
}

export class RequestEdited extends ValueObject<EditedProps> {
  private constructor(props: EditedProps) {
    super(props);
  }

  public get value(): boolean {
    return this.props.value;
  }

  public static create(value: boolean): RequestEdited {
    return new RequestEdited({ value });
  }

  public static initial(): RequestEdited {
    return new RequestEdited({ value: false });
  }

  public edited(): RequestEdited {
    return new RequestEdited({ value: true });
  }
}
