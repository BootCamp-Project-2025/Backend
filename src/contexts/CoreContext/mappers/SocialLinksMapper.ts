import { SocialLink as PrismaSocialLink } from "@/generated/prisma";
import { ArrayToArrayMapper } from "./ArrayToArrayMapper";
import { SocialLink } from "../domain/valueObjects/SocialLink";
import ISocialLinkDto from "../domain/interfaces/dtos/ISocialLinkDto";

export class SocialLinkMapper extends ArrayToArrayMapper<
  SocialLink,
  PrismaSocialLink
> {
  mapPersistanceToDomain(origin: ISocialLinkDto): SocialLink {
    return SocialLink.create({
      platform: origin.platform,
      url: origin.url,
    });
  }

  mapArrayPersistanceToDomain(origins: ISocialLinkDto[]): SocialLink[] {
    return origins.map((origin) => this.mapPersistanceToDomain(origin));
  }

  mapDomainToPersistance(origin: SocialLink): PrismaSocialLink {
    console.log(origin);
    throw new Error("Method not implemented.");
  }

  mapDomainToDto(domain: SocialLink): ISocialLinkDto {
    return {
      platform: domain.props.platform,
      url: domain.props.url,
    };
  }
  mapArrayDomainToDto(items: SocialLink[]): ISocialLinkDto[] {
    return items.map((item) => this.mapDomainToDto(item));
  }
}
