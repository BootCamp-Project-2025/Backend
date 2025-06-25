/* eslint-disable @typescript-eslint/no-unused-vars */
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import { Education } from "../../domain/entities/Education";
import IEducationRepository from "../../domain/interfaces/repositories/IEducationRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { educationMapper } from "../../mappers/EducationMapper";

export default class EducationRepository implements IEducationRepository {
  create(object: Education): Promise<void | Education> {
    throw new Error("Method not implemented.");
  }
  async add(education: Education): Promise<Education> {
    try {
      const educationPersistence =
        educationMapper.mapDomainToPersistance(education);
      const newEducation = await PrismaClient.education.create({
        data: {
          career: educationPersistence.career,
          university: educationPersistence.university,
          startDate: educationPersistence.startDate,
          endDate: educationPersistence.endDate,
          freelancer: {
            connect: {
              id: educationPersistence.freelancerId,
            },
          },
        },
      });
      return educationMapper.mapPersistanceToDomain(newEducation);
    } catch (error) {
      if (error as ApiError) throw error;
      else throw new ApiError();
    }
  }
  async getByFreelancerId(freelancerId: string): Promise<Education[]> {
    try {
      const educations = await PrismaClient.education.findMany({
        where: { freelancerId: freelancerId },
      });
      return educationMapper.mapArrayPersistanceToDomain(educations);
    } catch (error) {
      if (error as ApiError) throw error;
      else throw new ApiError();
    }
  }
  async delete(id: string): Promise<string | void> {
    try {
      await PrismaClient.education.delete({ where: { id: id } });
    } catch (error) {
      if (error as ApiError) throw error;
      else throw new ApiError();
    }
  }
  async save(freelancer: Freelancer): Promise<Education> {
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
  async update(id: string, object: Education): Promise<void | Education> {
    throw new Error("Method not implemented.");
  }
}
