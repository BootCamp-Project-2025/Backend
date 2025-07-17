import { Client } from "@/contexts/CoreContext/domain/aggregates/Client";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { PhoneNumber } from "@/contexts/CoreContext/domain/valueObjects/PhoneNumber";
import { Country } from "@/contexts/CoreContext/domain/valueObjects/Country";
import { City } from "@/contexts/CoreContext/domain/valueObjects/City";
import { Gender } from "@/contexts/CoreContext/domain/valueObjects/Gender";
import { DateOfBirth } from "@/contexts/CoreContext/domain/valueObjects/DateOfBirth";
import { SocialLinks } from "@/contexts/CoreContext/domain/OneToMany/SocialLinks";
import { SocialLink } from "@/contexts/CoreContext/domain/valueObjects/SocialLink";

export class ClientMother {
  static createValidClient(): Client {
    const userId = UserId.create(
      new UniqueEntityID("e3e58457-f4f2-41a1-9cf8-bdd67103e912")
    );
    const phoneNumber = PhoneNumber.create("+54 911 1234-5678");
    const country = Country.create("Argentina");
    const city = City.create("Buenos Aires");
    const gender = Gender.create("male");
    const dateOfBirth = DateOfBirth.create(new Date("1995-07-17"));
    const socialLinks = SocialLinks.create([
      SocialLink.create({
        platform: "LINKEDIN",
        url: "https://linkedin.com/in/example",
      }),
      SocialLink.create({
        platform: "YOUTUBE",
        url: "https://youtube.com/in/example",
      }),
    ]);

    return Client.create(
      {
        userId,
        phoneNumber,
        country,
        city,
        gender,
        dateOfBirth,
        socialLinks,
      },
      new UniqueEntityID("46263e55-d602-4243-aea7-23db886bf860")
    );
  }
}
