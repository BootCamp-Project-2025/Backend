import { Request, Response } from "express";
export default interface IFreelancerController {
  addSkill(req: Request, res: Response): void;
  getSkills(req: Request, res: Response): void;
}
