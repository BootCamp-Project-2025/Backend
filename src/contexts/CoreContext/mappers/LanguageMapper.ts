import { Language as PrismaLanguage } from "@/generated/prisma";
import { ArrayToArrayMapper } from "./ArrayToArrayMapper";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Language } from "../domain/entities/Language";

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
}
