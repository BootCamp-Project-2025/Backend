import { Request, Response } from "express";

export default interface ILanguageController {
  addLanguage(req: Request, res: Response): Promise<void>;
  deleteLanguage(req: Request, res: Response): Promise<void>;
  getLanguages(req: Request, res: Response): Promise<void>;
  editLanguage(req: Request, res: Response): Promise<void>;
}
