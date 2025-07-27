import { Request, Response } from "express";

export interface IStudentTrackProgressController {
    trackVideoProgress(req: Request, res: Response): Promise<void>;
    completeResource(req: Request, res: Response): Promise<void>;
    getProgress(req: Request, res: Response): Promise<void>;
    markAsCompleted(req: Request, res: Response): Promise<void>;
}
