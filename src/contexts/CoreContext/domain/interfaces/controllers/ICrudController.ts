import { Request, Response } from "express";

export interface ICrudController<T> {
  getAll(req: Request, res: Response): Promise<T>;
  getById(req: Request, res: Response): Promise<T>;
  create(req: Request, res: Response): Promise<T>;
  update(req: Request, res: Response): Promise<T>;
  deleteById(req: Request, res: Response): Promise<T>;
}
