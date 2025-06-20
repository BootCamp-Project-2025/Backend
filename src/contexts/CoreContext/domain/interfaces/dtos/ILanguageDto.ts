import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

export interface ILanguageDto {
  id: UniqueEntityID;
  name: string;
  level: "basic" | "intermediate" | "advanced" | "native";
}
