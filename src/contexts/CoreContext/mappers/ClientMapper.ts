import { Client } from "../domain/aggregates/Client";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { UserId } from "../domain/valueObjects/UserId";
import { PhoneNumber } from "../domain/valueObjects/PhoneNumber";
import { City } from "../domain/valueObjects/City";
import { Country } from "../domain/valueObjects/Country";
import { Gender } from "../domain/valueObjects/Gender";
import { DateOfBirth } from "../domain/valueObjects/DateOfBirth";
import { SocialLinks } from "../domain/OneToMany/SocialLinks";
import { SocialLinkMapper } from "./SocialLinksMapper";
import { IClientProfileDto } from "../domain/interfaces/dtos/IClientProfileDto";

export default class ClientMapper {
  static persistanceTodomain(clientDto: IClientProfileDto): Client {
    try {
      return Client.create(
        {
          userId: UserId.create(new UniqueEntityID(clientDto.userId)),
          phoneNumber: clientDto.phoneNumber
            ? PhoneNumber.create(clientDto.phoneNumber)
            : undefined,

          city: clientDto.city ? City.create(clientDto.city) : undefined,

          country: clientDto.country
            ? Country.create(clientDto.country)
            : undefined,

          gender: clientDto.gender
            ? Gender.create(clientDto.gender)
            : undefined,

          dateOfBirth: clientDto.dateOfBirth
            ? DateOfBirth.create(
                typeof clientDto.dateOfBirth === "string"
                  ? new Date(clientDto.dateOfBirth)
                  : clientDto.dateOfBirth
              )
            : undefined,

          socialLinks: clientDto.socialLinks
            ? SocialLinks.create(
                new SocialLinkMapper().mapArrayPersistanceToDomain(
                  clientDto.socialLinks
                )
              )
            : undefined,
        },
        new UniqueEntityID(clientDto.id)
      );
    } catch (e) {
      console.log(e);
      throw new Error("cant mapp persistance to domain in ClientMapper");
    }
  }

  static domainToGetClientDto(client: Client): IClientProfileDto {
    return {
      userId: client.userId.toString(),
      id: client.id.toString(),
      phoneNumber: client.phoneNumber?.value,
      country: client.country?.value,
      city: client.city?.value,
      gender: client.gender?.value,
      dateOfBirth: client.dateOfBirth?.value,
      socialLinks: client.socialLinks
        ? new SocialLinkMapper().mapArrayDomainToDto(
            client.socialLinks.currentItems
          )
        : [],
    };
  }
}
