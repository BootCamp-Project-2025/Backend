import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { UserId } from "../valueObjects/UserId";
import { AggregateRoot } from "@/contexts/Shared/domain/AgregateRoot";
import { PhoneNumber } from "../valueObjects/PhoneNumber";
import { Country } from "../valueObjects/Country";
import { City } from "../valueObjects/City";
import { Gender } from "../valueObjects/Gender";
import { DateOfBirth } from "../valueObjects/DateOfBirth";
import { SocialLinks } from "../OneToMany/SocialLinks";

interface ClientProps {
  userId: UserId;
  phoneNumber?: PhoneNumber;
  country?: Country;
  city?: City;
  gender?: Gender;
  dateOfBirth?: DateOfBirth;
  socialLinks?: SocialLinks;
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

  get phoneNumber(): PhoneNumber | undefined {
    return this.props.phoneNumber;
  }

  get country(): Country | undefined {
    return this.props.country;
  }

  get city(): City | undefined {
    return this.props.city;
  }

  get gender(): Gender | undefined {
    return this.props.gender;
  }

  get dateOfBirth(): DateOfBirth | undefined {
    return this.props.dateOfBirth;
  }

  get socialLinks(): SocialLinks | undefined {
    return this.props.socialLinks;
  }
}
