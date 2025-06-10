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
  roles: UserRole[];
  clientProfile?: Client;
  freelancerProfile?: Freelancer;
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
  private addRole(role: UserRole): void {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
    }
  }

  public assignFreelancerProfile(profile: Freelancer): void {
    this.props.freelancerProfile = profile;
    this.addRole("FREELANCER");
  }

  private assignClientProfile(profile: Client): void {
    this.props.clientProfile = profile;
    this.addRole("CLIENT");
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  private static filterProfilesByRoles(props: UserProps, roles: UserRole[]) {
    return {
      clientProfile: roles.includes("CLIENT") ? props.clientProfile : undefined,
      freelancerProfile: roles.includes("FREELANCER")
        ? props.freelancerProfile
        : undefined,
    };
  }

  public static create(props: UserProps, id?: UniqueEntityID): User {
    if (!props.userName || !props.userEmail) {
      throw new Error("Full name and email are required.");
    }

    const roles: UserRole[] =
      props.roles && props.roles.length > 0 ? props.roles : ["CLIENT"];
    if (roles.includes("FREELANCER") && !props.freelancerProfile) {
      throw new Error("Freelancer profile is required for role FREELANCER.");
    }
    /*
    if (roles.includes("CLIENT") && !props.clientProfile) {
      throw new Error("Client profile is required for role CLIENT.");
    }*/

    const profiles = this.filterProfilesByRoles(props, roles);

    return new User(
      {
        userName: props.userName,
        userEmail: props.userEmail,
        roles,
        clientProfile: profiles.clientProfile,
        freelancerProfile: profiles.freelancerProfile,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }
}
