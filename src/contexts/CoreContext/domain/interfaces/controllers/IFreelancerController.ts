import { Request, Response } from "express";
export default interface IFreelancerController {
  getAll(req: Request, res: Response): Promise<void>;
  addSkill(req: Request, res: Response): void;
  editSkill(req: Request, res: Response): void;
  deleteSkill(req: Request, res: Response): void;
  getSkills(req: Request, res: Response): void;
}
