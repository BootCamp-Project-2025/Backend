import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import ILanguageController from "@/contexts/CoreContext/domain/interfaces/controllers/ILanguageController";
import { ILanguageDto } from "@/contexts/CoreContext/domain/interfaces/dtos/ILanguageDto";
import { ILanguagesService } from "@/contexts/CoreContext/domain/interfaces/services/ILanguages";
import { LanguageMapper } from "@/contexts/CoreContext/mappers/LanguageMapper";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class LanguageController implements ILanguageController {
  constructor(
    @inject("ILanguagesService") private languagesService: ILanguagesService
  ) {}

  editLanguage = async (req: Request, res: Response): Promise<void> => {
    try {
      req.body.id = req.params.languageId;
      const body: ILanguageDto = req.body as ILanguageDto;
      const language = LanguageMapper.createLanguageDtoTodomain(body);
      const data = await this.languagesService.updateLanguage(
        language,
        req.params.freelancerId
      );
      const datadto: ILanguageDto = LanguageMapper.mapDomainToDto(data);
      const response = new SuccessResponseEntity(datadto, StatusCodes.OK);
      ResponseService.send(res, response);
    } catch (error) {
      if (error as ApiError) {
        throw error;
      } else {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
      }
    }
  };

  addLanguage = async (req: Request, res: Response): Promise<void> => {
    try {
      const body: ILanguageDto = req.body as ILanguageDto;
      const language = LanguageMapper.createLanguageDtoTodomain(body);
      const data = await this.languagesService.addLanguage(
        language,
        req.params.freelancerId
      );
      const datadto: ILanguageDto = LanguageMapper.mapDomainToDto(data);
      const response = new SuccessResponseEntity(datadto, StatusCodes.OK);
      ResponseService.send(res, response);
    } catch (error) {
      if (error as ApiError) {
        throw error;
      } else {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
      }
    }
  };

  deleteLanguage = async (req: Request, res: Response): Promise<void> => {
    try {
      req.body.id = req.params.languageId;
      const body: ILanguageDto = req.body as ILanguageDto;
      const language = LanguageMapper.createLanguageDtoTodomain(body);
      await this.languagesService.removeLanguage(
        language,
        req.params.freelancerId
      );
      const response = new SuccessResponseEntity(
        "Language removed",
        StatusCodes.OK
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error as ApiError) {
        throw error;
      } else {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
      }
    }
  };

  getLanguages = async (req: Request, res: Response): Promise<void> => {
    try {
      const languages = await this.languagesService.getLanguages(
        req.params.freelancerId
      );
      const data = languages.map((row: Language) => {
        return LanguageMapper.mapDomainToDto(row);
      });
      if (languages.length === 0) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Languages not found");
      } else {
        const response = new SuccessResponseEntity(data, StatusCodes.OK);
        ResponseService.send(res, response);
      }
    } catch (error) {
      if (error as ApiError) {
        throw error;
      } else {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
      }
    }
  };
}
