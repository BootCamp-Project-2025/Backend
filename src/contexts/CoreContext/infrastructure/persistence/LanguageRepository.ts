import { injectable } from "tsyringe";
import { ILanguageRepository } from "../../domain/interfaces/repositories/ILanguageRepositoty";
import { Language } from "../../domain/entities/Language";
import { LanguageMapper } from "../../mappers/LanguageMapper";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

@injectable()
export default class languageRepository implements ILanguageRepository {
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
  async editLanguage(language: Language): Promise<Language> {
    try {
      const dbLanguage = LanguageMapper.domainToPersistance(language);
      await PrismaClient.language.update({
        where: { id: language.id.toString() },
        data: { level: dbLanguage.level },
      });

      return language;
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Language could not be updated"
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
  async deleteLanguage(languageId: UniqueEntityID): Promise<Language> {
    try {
      const deletedLanguage = await PrismaClient.language.delete({
        where: { id: languageId.toString() },
      });

      return LanguageMapper.persistanceTodomain(deletedLanguage);
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Language could not be deleted"
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
  delete(id: string): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
  create(object: Language): Promise<Language> {
    throw new Error("Method not implemented.");
  }
  update(id: string, object: Language): Promise<Language> {
    throw new Error("Method not implemented.");
  }
}
