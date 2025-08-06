import { Request as ExpressRequest, Response } from "express";
import IRequestController from "@/contexts/CoreContext/domain/interfaces/controllers/IRequestController";
import IRequestService from "@/contexts/CoreContext/domain/interfaces/services/IRequestService";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { inject, injectable } from "tsyringe";
import { Request } from "@/contexts/CoreContext/domain/aggregates/Request";
import { StatusCodes } from "http-status-codes";
import RequestMapper from "@/contexts/CoreContext/mappers/RequestMapper";

import RequestDtoBuilder, {
  RequestDto,
} from "@/contexts/CoreContext/domain/interfaces/dtos/RequestDto";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { ParamMapper } from "@/contexts/CoreContext/mappers/ParamsMapper";

@injectable()
export class RequestController implements IRequestController {
  constructor(
    @inject("IRequestService") private readonly service: IRequestService
  ) {}

  delete = async (req: ExpressRequest, res: Response): Promise<void> => {
    try {
      const requestId = req.params.requestId;
      await this.service.delete(requestId);
      const response = new SuccessResponseEntity({}, StatusCodes.NO_CONTENT);
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else throw new ApiError();
    }
  };

  getUserActiveRequest = async (
    req: ExpressRequest,
    res: Response
  ): Promise<void> => {
    try {
      const user = RequestController.getUser(req);
      const title = (req.query.title as string) ?? "";
      const requestList: Request[] = await this.service.getUserActiveRequest(
        user.id,
        title
      );
      const requestListDto = requestList.map((domainRequest) =>
        RequestDtoBuilder.builder()
          .id(domainRequest.id.toValue())
          .title(domainRequest.getTitle().value)
          .estimation(domainRequest.getEstimation().value)
          .description(domainRequest.getDescription().value)
          .build()
      );
      const response = new SuccessResponseEntity(
        requestListDto,
        StatusCodes.OK
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else throw new ApiError();
    }
  };

  create = async (req: ExpressRequest, res: Response): Promise<void> => {
    try {
      const user = RequestController.getUser(req);
      const requestDto = RequestController.changeTypeToDto(req.body);
      requestDto.userId = user.id;
      const requestDomain = RequestMapper.dtoToDomain(requestDto);
      const newRequestDomain = await this.service.create(requestDomain);
      const responseData = RequestMapper.domainToDto(newRequestDomain);
      const response = new SuccessResponseEntity(
        responseData,
        StatusCodes.CREATED,
        "A new request was created sucessfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else throw new ApiError();
    }
  };

  private static changeTypeToDto(body: unknown): RequestDto {
    try {
      return body as RequestDto;
    } catch {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "The data is not a valid Client request"
      );
    }
  }

  private static getUser(req: ExpressRequest) {
    const user = req.user;
    if (!user || !user.id) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "User info is not valid");
    }
    return user as {
      id: string;
      email: string;
      name: string;
    };
  }

  search = async (req: ExpressRequest, res: Response): Promise<void> => {
    const params = ParamMapper.expressQueryToDto(req);
    const result = await this.service.searchRequest(params);
    const response = new SuccessResponseEntity(
      result,
      200,
      "Request found successfully"
    );

    ResponseService.send(res, response);
  };

  getById = async (req: ExpressRequest, res: Response): Promise<void> => {
    try {
      const requestId = req.params.requestId;
      const requestDomain = await this.service.getById({ requestId });
      if (!requestDomain) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Request not found");
      }

      const responseData = RequestMapper.domainToDto(requestDomain);
      const response = new SuccessResponseEntity(responseData, StatusCodes.OK);

      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else throw new ApiError();
    }
  };

  update = async (req: ExpressRequest, res: Response): Promise<void> => {
    try {
      const { requestId } = req.params;
      const requestDto = req.body as RequestDto;

      const requestDomain = RequestMapper.dtoToDomain(requestDto);
      const updatedRequestDomain = await this.service.update(
        requestId,
        requestDomain
      );

      const requestDtoResponse =
        RequestMapper.domainToDto(updatedRequestDomain);
      const response = new SuccessResponseEntity(
        requestDtoResponse,
        StatusCodes.OK,
        "Request updated successfully"
      );

      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else throw new ApiError();
    }
  };
}
