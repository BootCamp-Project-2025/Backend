// erase rule once used
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
import { Request, Response } from "express";

export interface ICourseController {
  create(req: Request, res: Response): Promise<Response>;
}
