import { AggregateRoot } from "@/contexts/Shared/Domain/AgregateRoot";
import { UserRoles } from "../entities/UserRoles";
import { UserEmail } from "../entities/UserEmail";
import { UserId } from "../entities/UserId";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";
//import { UserPassword } from "./valueObjects/UserPassword";

export interface UserProps {
  fullName: string;
  email: UserEmail;
  roles: UserRoles; // ['CLIENT'] | ['FREELANCER'] | ['CLIENT', 'FREELANCER']
  // password: UserPassword;
}

export class User extends AggregateRoot<UserProps> {
  get userId(): UserId {
    return UserId.create(this._id);
  }

  get email() {
    return this.props.email;
  }

  get roles(): UserRoles {
    return this.props.roles;
  }

  //   public hasRole(role: UserRoles): boolean {
  //     return this.props.roles.includes(role);
  //   }

  //   public addRole(role: UserRoles): void {
  //     if (!this.hasRole(role)) {
  //       this.props.roles.push(role);
  //     }
  //   }
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): User {
    if (!props.fullName || !props.email) {
      throw new Error("Full name and email are required.");
    }
    return new User(
      {
        ...props,
        roles: props.roles ?? ["CLIENT"],
      },
      id
    );
  }
}
