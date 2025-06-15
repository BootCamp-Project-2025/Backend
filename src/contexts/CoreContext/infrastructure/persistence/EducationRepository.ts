import { Education } from "../../domain/entities/Education";
import { IEducationRepository } from "../../domain/interfaces/repositories/IEducationRepository";
import { EducationMapper } from "../../mappers/EducationMapper";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";

export class EducationRepository implements IEducationRepository {
  getAll(): Promise<Education[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<Education | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
  create(object: Education): Promise<Education> {
    throw new Error("Method not implemented.");
  }
  update(id: string, object: Education): Promise<Education> {
    throw new Error("Method not implemented.");
  }
}
