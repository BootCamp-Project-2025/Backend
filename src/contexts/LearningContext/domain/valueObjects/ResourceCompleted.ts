import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface ResourceCompletedProps {
  url: string;
}

export class ResourceCompleted extends ValueObject<ResourceCompletedProps> {
  get url(): string {
    return this.props.url;
  }

  public static create(props: ResourceCompletedProps): ResourceCompleted {
    return new ResourceCompleted(props);
  }
}
