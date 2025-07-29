import { ISearchController } from "@/contexts/CoreContext/domain/interfaces/controllers/ISearchController";
import { QueryParamsDto } from "@/contexts/CoreContext/domain/interfaces/dtos/search/QueryParamsDto";
import { ISearchService } from "@/contexts/CoreContext/domain/interfaces/services/ISearchService";
import { queryToSearchParams } from "@/contexts/CoreContext/mappers/ParamsMapper";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class SearchController implements ISearchController {
  constructor(
    @inject("ISearchService")
    private searchService: ISearchService
  ) { }

  search = async (req: Request, res: Response): Promise<void> => {
    const params: QueryParamsDto = {
      query: req.query.query as string,
      page: req.query.page ? Number(req.query.page) : 1,
      size: req.query.size ? Number(req.query.size) : 10,
      order: req.query.order as string,
      sort: req.query.sort as "asc" | "desc",
      category: req.query.category as string,
      subcategory: req.query.subcategory as string,
      language: req.query.language as string,
    };

    const searchParams = queryToSearchParams(
      params,
      ["title", "description"],
      "requests"
    );

    const response = new SuccessResponseEntity(
      await this.searchService.search(searchParams),
      200,
      "message"
    );
    ResponseService.send(res, response);
  };
}
