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
    const level = prismaLanguage.level as
      | "basic"
      | "intermediate"
      | "advanced"
      | "native";
    return new Language(
      {
        name: prismaLanguage.name,
        level: level,
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
    return prismaSkills.map((prismaLanguage: PrismaLanguage) => {
      const level = prismaLanguage.level as
        | "basic"
        | "intermediate"
        | "advanced"
        | "native";
      return new Language(
        { name: prismaLanguage.name, level: level },
        new UniqueEntityID(prismaLanguage.id)
      );
    });
  }

  static domainToPersistanceBulk(languages: Language[]): PrismaSave[] {
    return languages.map((language: Language) =>
      this.domainToPersistance(language)
    );
  }

  static createLanguageDtoTodomain(dto: ILanguageDto) {
    return new Language(
      {
        name: dto.name,
        level: dto.level,
      },
      new UniqueEntityID(dto.id)
    );
  }

  static domaintToDto(language: Language): ILanguageDto {
    return {
      id: language.id.toString(),
      level: language.level,
      name: language.name,
    };
  }
}
