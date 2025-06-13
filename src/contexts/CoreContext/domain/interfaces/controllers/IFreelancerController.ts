import { Request, Response } from "express";
export default interface IFreelancerController {
  addSkill(): void;
  deleteSkill(): void;
  editSkill(): void;
  getSkills(): void;
  getAbout(req: Request, res: Response): void;
  updateAbout(req: Request, res: Response): void;
}
