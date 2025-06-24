import { Freelancer } from "../../domain/aggregates/Freelancer";
import { Education } from "../../domain/entities/Education";
import IEducationRepository from "../../domain/interfaces/repositories/IEducationRepository";

export default class EducationRepository implements IEducationRepository {
  async save(freelancer: Freelancer): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getEducationsById(freelancerId: string): Promise<Education[]> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<Education[]> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<Education | null> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
  async create(object: Education): Promise<void | Education> {
    throw new Error("Method not implemented.");
  }
  async update(id: string, object: Education): Promise<void | Education> {
    throw new Error("Method not implemented.");
  }
}
