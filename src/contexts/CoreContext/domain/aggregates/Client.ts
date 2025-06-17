import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { UserId } from "../valueObjects/UserId";
import { AggregateRoot } from "@/contexts/Shared/domain/AgregateRoot";

interface ClientProps {
  userId: UserId;
}

export class Client extends AggregateRoot<ClientProps> {
  private constructor(props: ClientProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: ClientProps, id?: UniqueEntityID): Client {
    if (!props.userId) {
      throw new Error("User ID is required.");
    }

    return new Client(props, id);
  }

  get clientId(): UniqueEntityID {
    return this._id;
  }

  get userId(): UserId {
    return this.props.userId;
  }
}
