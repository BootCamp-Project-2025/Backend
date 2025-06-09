import { Education } from "../../entities/Education";

export interface IEducationService {
  getAll(): Education[];
  add(education: Education): void;
  removeById(id: string): void;
}
