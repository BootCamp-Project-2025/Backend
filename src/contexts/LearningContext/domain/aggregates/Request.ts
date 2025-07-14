import { AggregateRoot } from "@/contexts/Shared/domain/AgregateRoot";
import { RequestDescription } from "../valueObjects/RequestDescription";
import { RequestStatus } from "../valueObjects/RequestStatus";
import { RequestTitle } from "../valueObjects/RequestTitle";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

export interface RequestProps {
  title: RequestTitle;
  description: RequestDescription;
  status: RequestStatus;
  clientId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type RequestPrimitiveProps = {
  id: string;
  title: string;
  descritpion: string;
  status: string;
  clientId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Request extends AggregateRoot<RequestProps> {
  private constructor(props: RequestProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: RequestProps, id?: UniqueEntityID): Request {
    const now = new Date();
    return new Request(
      {
        ...props,
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
      },
      id
    );
  }

  public static createFromObject(
    props: RequestPrimitiveProps,
    id?: UniqueEntityID
  ): Request {
    const titleValue = RequestTitle.create({ title: props.title });
    const descriptionValue = RequestDescription.create({
      description: props.descritpion,
    });
    const statusValue = RequestStatus.create({ status: props.status });

    const request: RequestProps = {
      title: titleValue,
      description: descriptionValue,
      status: statusValue,
      clientId: props.clientId,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };

    return Request.create(request, id);
  }

  getTitle(): RequestTitle {
    return this.props.title;
  }

  getDescription(): RequestDescription {
    return this.props.description;
  }

  getStatus(): RequestStatus {
    return this.props.status;
  }

  getClientId(): string {
    return this.props.clientId;
  }

  getCreatedAt(): Date {
    return this.props.createdAt!;
  }

  getUpdatedAt(): Date {
    return this.props.updatedAt!;
  }

  setTitle(newTitle: RequestTitle): void {
    this.props.title = newTitle;
    this.updateTimestamp();
  }

  setDescription(newDescription: RequestDescription): void {
    this.props.description = newDescription;
    this.updateTimestamp();
  }

  setStatus(newStatus: RequestStatus): void {
    this.props.status = newStatus;
    this.updateTimestamp();
  }

  public accept(): void {
    if (!this.props.status.isPending()) {
      throw new Error("Only pending requests can be accepted");
    }
    this.setStatus(RequestStatus.create({ status: "ACCEPTED" }));
  }

  public reject(): void {
    if (!this.props.status.isPending()) {
      throw new Error("Only pending requests can be rejected");
    }
    this.setStatus(RequestStatus.create({ status: "REJECTED" }));
  }

  private updateTimestamp(): void {
    this.props.updatedAt = new Date();
  }

  public isValid(): boolean {
    try {
      return (
        this.props.title.value.trim().length > 0 &&
        this.props.description.value.trim().length > 0 &&
        this.props.clientId.trim().length > 0
      );
    } catch {
      return false;
    }
  }
}
