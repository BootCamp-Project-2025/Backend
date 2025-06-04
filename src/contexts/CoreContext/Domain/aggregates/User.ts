import { AggregateRoot } from "@/contexts/Shared/Domain/AgregateRoot";
import { UserRoles } from "../entities/UserRoles";
import { UserEmail } from "../valueObjects/UserEmail";
import { UserId } from "../valueObjects/UserId";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";
import { UserName } from "../valueObjects/UserName";
//import { UserPassword } from "./valueObjects/UserPassword";

export interface UserProps {
  userName: UserName;
  userEmail: UserEmail;
  roles: UserRoles; // ['CLIENT'] | ['FREELANCER'] | ['CLIENT', 'FREELANCER'] Enum
  //date: new Date();
  // password: UserPassword;
  // isAdmin: boolean;
}

export class User extends AggregateRoot<UserProps> {
  get userId(): UserId {
    return UserId.create(this._id);
  }

  get userName() {
    return this.props.userName;
  }

  get email() {
    return this.props.userEmail;
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
    if (!props.userName || !props.userEmail) {
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

// User (AR)
// ├── userId: UUID
// ├── email: UserEmail (VO)
// ├── username: UserName (VO)
// ├── roles: UserRoles (VO)
// └── ...autenticación...
