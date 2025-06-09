import { Language } from "../../valueObjects/Language";

export interface ILanguageService {
  add(language: Language): void;
  remove(language: Language): void;
  getAll(): Language[];
  count(): number;
}
