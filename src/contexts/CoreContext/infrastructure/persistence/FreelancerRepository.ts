import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import FreelancerMapper from "../../mappers/FreelancerMapper";
import { FreelancerDao } from "../../domain/interfaces/dao/FreelancerDao";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export class FreelancerRepository implements IFreelancerRepository {
  getAll(): Promise<Freelancer[]> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<Freelancer> {
    try {
      const freelancerDb: FreelancerDao | null =
        await PrismaClient.freelancer.findUnique({
          where: { id: id },
          include: {
            certifications: true,
            experience: true,
            skills: true,
            education: true,
            languages: true,
          },
        });
      if (freelancerDb !== null)
        return FreelancerMapper.persistanceToDomain(freelancerDb);
      else
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          "freelancer profile not found"
        );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      console.log(error);
      throw new Error("database error");
    }
  }
  delete(id: string): Promise<string | void> {
    console.log(id);
    throw new Error("Method not implemented.");
  }
  create(object: Freelancer): Promise<Freelancer> {
    console.log(object);
    throw new Error("Method not implemented.");
  }
  update(id: string, object: Freelancer): Promise<Freelancer> {
    console.log(id, object);
    throw new Error("Method not implemented.");
  }
}
