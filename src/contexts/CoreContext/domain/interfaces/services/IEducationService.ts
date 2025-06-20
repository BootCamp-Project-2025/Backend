import { Education } from "../../entities/Education";

export interface IEducations {
  getAll(): Education[];
  add(education: Education): void;
  removeById(id: string): void;
}
