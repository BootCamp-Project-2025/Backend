import { AggregateRoot } from "@/contexts/Shared/domain/AgregateRoot";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { UserName } from "../valueObjects/UserName";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { UserEmail } from "../valueObjects/UserEmail";
import { UserId } from "../valueObjects/UserId";

export type UserRole = "CLIENT" | "FREELANCER";

export interface UserProps {
  userName: UserName;
  userEmail: UserEmail;
  roles: UserRole[];
  clientId?: UniqueEntityID;
  freelancerId?: UniqueEntityID;
  createdAt: Date;
  profilePicture?: string;
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

  get profilePicture() {
    return this.props.profilePicture;
  }

  // Getters per profile
  get isClient(): boolean {
    return this.roles.includes("CLIENT");
  }

  get isFreelancer(): boolean {
    return this.roles.includes("FREELANCER");
  }

  // Methods to manage roles
  private addRole(role: UserRole): void {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
    }
  }

  public assignFreelancerProfile(profileId: UniqueEntityID): void {
    this.props.freelancerId = profileId;
    this.addRole("FREELANCER");
  }

  private assignClientProfile(profileId: UniqueEntityID): void {
    this.props.clientId = profileId;
    this.addRole("CLIENT");
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  private static filterProfilesByRoles(props: UserProps, roles: UserRole[]) {
    return {
      clientProfile: roles.includes("CLIENT") ? props.clientId : undefined,
      freelancerProfile: roles.includes("FREELANCER")
        ? props.freelancerId
        : undefined,
    };
  }

  public static create(props: UserProps, id?: UniqueEntityID): User {
    if (!props.userName || !props.userEmail) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Full name and email are required."
      );
    }

    const roles: UserRole[] =
      props.roles && props.roles.length > 0 ? props.roles : ["CLIENT"];
    if (roles.includes("FREELANCER") && !props.freelancerId) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Freelancer profile is required for role FREELANCER."
      );
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
        clientId: profiles.clientProfile,
        freelancerId: profiles.freelancerProfile,
        createdAt: props.createdAt ?? new Date(),
        profilePicture: props.profilePicture ?? "",
      },
      id
    );
  }
}
