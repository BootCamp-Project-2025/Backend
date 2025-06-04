import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";
import { UserId } from "../valueObjects/UserId";
import { Entity } from "@/contexts/Shared/Domain/Entity";

interface ClientProps {
  userId: UserId; //Relation with AggregateRoot User
  //Here we can add coursesTacking, tracks etc
}

export class Client extends Entity<ClientProps> {
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

  // gets
}

// ClientProfile (AR)
// ├── clientId: UUID
// ├── userId: UUID (referencia al User)
// ├── courses taken etc
