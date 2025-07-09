/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from "tsyringe";
import { ILanguageRepository } from "../../domain/interfaces/repositories/ILanguageRepositoty";
import { Language } from "../../domain/entities/Language";
import { LanguageMapper } from "../../mappers/LanguageMapper";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

@injectable()
export default class LanguageRepository implements ILanguageRepository {
  async getlanguageId(
    freelancerId: string,
    language: Language
  ): Promise<string | undefined> {
    try {
      const languageId = await PrismaClient.language.findFirst({
        where: { freelancerId: freelancerId, name: language.name },
      });

      return languageId?.id;
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Language not found"
      );
    }
  }
  async addLanguage(
    freelancerId: string,
    language: Language
  ): Promise<Language> {
    try {
      const dbLanguage = LanguageMapper.domainToPersistance(language);
      await PrismaClient.language.create({
        data: {
          ...dbLanguage,
          freelancerId: freelancerId,
        },
      });

      return language;
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Language could not be created"
      );
    }
  }
  async getLanguages(freelancerId: string): Promise<Language[]> {
    try {
      const languagesDb = await PrismaClient.language.findMany({
        where: { freelancerId: freelancerId },
      });
      return LanguageMapper.persistanceToDomainBulk(languagesDb);
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Languages not found"
      );
    }
  }
  getAll(): Promise<Language[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<Language | null> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<string | void> {
    try {
      await PrismaClient.language.delete({
        where: { id: id },
      });

      return "Language deleted";
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Language could not be deleted"
      );
    }
  }
  async create(object: Language): Promise<Language> {
    throw new Error("Method not implemented.");
  }
  async update(id: string, object: Language): Promise<Language> {
    try {
      const dbLanguage = LanguageMapper.domainToPersistance(object);
      await PrismaClient.language.update({
        where: { id: id },
        data: { level: dbLanguage.level },
      });

      return object;
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Language could not be updated"
      );
    }
  }
}
