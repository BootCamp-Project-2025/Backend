import { IEducationService } from "@/contexts/CoreContext/domain/interfaces/services/IEducationService";
import { Education } from "../../domain/entities/Education";

export default class EducationService implements IEducationService {
  getAll(): Education[] {
    throw new Error("Method not implemented.");
  }
  add(education: Education): void {
    throw new Error("Method not implemented.");
  }
  removeById(id: string): void {
    throw new Error("Method not implemented.");
  }
}
