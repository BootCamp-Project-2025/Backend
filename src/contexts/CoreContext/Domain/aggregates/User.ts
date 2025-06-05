import { AggregateRoot } from "@/contexts/Shared/Domain/AgregateRoot";
import { UserEmail } from "../valueObjects/UserEmail";
import { UserId } from "../valueObjects/UserId";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";
import { UserName } from "../valueObjects/UserName";
import { Client } from "../entities/Client";
import { Freelancer } from "../entities/Freelancer";

export type UserRole = "CLIENT" | "FREELANCER";

export interface UserProps {
  userName: UserName;
  userEmail: UserEmail;
  roles: UserRole[]; // ['CLIENT'] | ['FREELANCER'] | ['CLIENT', 'FREELANCER']
  clientProfile?: Client; // Only if it includes "CLIENT"
  freelancerProfile?: Freelancer; // Only if it includes "FREELANCER"
  createdAt: Date;
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

  get roles(): UserRole[] {
    return this.props.roles;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
  // Getters per profile
  get isClient(): boolean {
    return this.roles.includes("CLIENT");
  }

  get isFreelancer(): boolean {
    return this.roles.includes("FREELANCER");
  }

  get clientProfile(): Client | undefined {
    return this.props.clientProfile;
  }

  get freelancerProfile(): Freelancer | undefined {
    return this.props.freelancerProfile;
  }

  // Methods to manage roles
  public addRole(role: UserRole): void {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
    }
  }

  public assignFreelancerProfile(profile: Freelancer): void {
    this.props.freelancerProfile = profile;
    this.addRole("FREELANCER");
  }

  public assignClientProfile(profile: Client): void {
    this.props.clientProfile = profile;
    this.addRole("CLIENT");
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): User {
    if (!props.userName || !props.userEmail) {
      throw new Error("Full name and email are required.");
    }

    const roles: UserRole[] =
      props.roles && props.roles.length > 0 ? props.roles : ["CLIENT"]; // default role
    // Conditional validations: if there is a role, there must be a profile
    if (roles.includes("FREELANCER") && !props.freelancerProfile) {
      throw new Error("Freelancer profile is required for role FREELANCER.");
    }

    if (roles.includes("CLIENT") && !props.clientProfile) {
      throw new Error("Client profile is required for role CLIENT.");
    }

    return new User(
      {
        userName: props.userName,
        userEmail: props.userEmail,
        roles,
        clientProfile: roles.includes("CLIENT")
          ? props.clientProfile
          : undefined,
        freelancerProfile: roles.includes("FREELANCER")
          ? props.freelancerProfile
          : undefined,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }
}

// User (AR)
// ├── userId: UUID
// ├── email: UserEmail (VO)
// ├── username: UserName (VO)
// ├── clientProfile?: Client
// ├── freelancerProfile?: Freelancer
// └── ...autenticación...

//We don't want Client and Freelancer to inherit from User, but rather User to internally add its entities (Client and Freelancer)

//So:
//User maintains common data (email, name, roles).
// If they have the "FREELANCER" role, then they have access to the freelancerProfile and its properties.
// If they have "CLIENT," the same applies to the clientProfile
//We can add some events like:
//  if (user.isFreelancer) {
//   user.freelancerProfile?.skills.add(skill);}

//TIP FOR PERSISTANCE: Wecan save the User in one table and ClientProfile and FreelancerProfile in another, using userId as the foreign key.
