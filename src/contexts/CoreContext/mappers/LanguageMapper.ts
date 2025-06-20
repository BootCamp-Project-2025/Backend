import { Language as PrismaLanguage } from "@/generated/prisma";
import { ArrayToArrayMapper } from "./ArrayToArrayMapper";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Language } from "../domain/entities/Language";
import { ILanguageDto } from "../domain/interfaces/dtos/ILanguageDto";

type PrismaSave = {
  name: string;
  id: string;
  level: "basic" | "intermediate" | "advanced" | "native";
};

export class LanguageMapper extends ArrayToArrayMapper<
  Language,
  PrismaLanguage
> {
  mapDomainToPersistance(origin: Language): {
    id: string;
    name: string;
    level: string;
    freelancerId: string;
  } {
    console.log(origin);
    throw new Error("Method not implemented.");
  }
  mapPersistanceToDomain(origin: {
    name: string;
    id: string;
    level: "basic" | "intermediate" | "advanced" | "native";
    freelancerId: string;
  }): Language {
    return Language.create(origin, new UniqueEntityID(origin.id));
  }

  static persistanceTodomain(prismaLanguage: PrismaLanguage): Language {
    return new Language(
      {
        name: prismaLanguage.name,
        level: prismaLanguage.level,
      },
      new UniqueEntityID(prismaLanguage.id)
    );
  }

  static domainToPersistance(language: Language): PrismaSave {
    return {
      name: language.name,
      level: language.level,
      id: new UniqueEntityID().toString(),
    };
  }

  static persistanceToDomainBulk(prismaSkills: PrismaLanguage[]): Language[] {
    return prismaSkills.map(
      (prismaLanguage: PrismaLanguage) =>
        new Language(
          { name: prismaLanguage.name, level: prismaLanguage.level },
          new UniqueEntityID(prismaLanguage.id)
        )
    );
  }

  static domainToPersistanceBulk(languages: Language[]): PrismaSave[] {
    return languages.map((language: Language) =>
      this.domainToPersistance(language)
    );
  }

  static domainToGetLanguageDto(language: Language): ILanguageDto {
    return new Language(
      {
        name: language.name,
        level: language.level,
      },
      language.id
    );
  }

  static createLanguageDtoTodomain(dto: ILanguageDto) {
    return new Language(
      {
        name: dto.name,
        level: dto.level,
      },
      dto.id
    );
  }
}
