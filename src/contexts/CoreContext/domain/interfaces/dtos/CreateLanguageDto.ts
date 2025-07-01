import { Language } from "../../entities/Language";

export type CreateLanguageDto = {
  language: Language;
  freelancerId: string;
};
