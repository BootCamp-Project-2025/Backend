import { Request, Response } from "express";

export interface ISearchController {
  search(req: Request, res: Response): Promise<void>;
}
