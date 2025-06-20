import { Language } from "../../entities/Language";

export interface ILanguages {
  add(language: Language): void;
  remove(language: Language): void;
  getAll(): Language[];
  count(): number;
}
