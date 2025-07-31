import { Request, Response } from "express";

export default interface IP2PCourseController {
  create(req: Request, res: Response): Promise<void>;
  addSession(req: Request, res: Response): Promise<void>;
  removeSession(req: Request, res: Response): Promise<void>;
  editSession(req: Request, res: Response): Promise<void>;
  completeSession(req: Request, res: Response): Promise<void>;
  addPost(req: Request, res: Response): Promise<void>;
  removePost(req: Request, res: Response): Promise<void>;
  editPost(req: Request, res: Response): Promise<void>;
  addFilePost(req: Request, res: Response): Promise<void>;
  removeFilePost(req: Request, res: Response): Promise<void>;
  getByUserIdAndCourseId(req: Request, res: Response): Promise<void>;
}
