import IFreelancerController from "@/contexts/CoreContext/domain/interfaces/controllers/IFreelancerController";
import { IFreelancerService } from "@/contexts/CoreContext/domain/interfaces/services/IFreelancerService";
import UserMapper from "@/contexts/CoreContext/mappers/UserMapper";
import { Request, Response } from "express";

export default class FreelancerController implements IFreelancerController {
  constructor(private freelancerService: IFreelancerService) {}
  deleteSkill(): void {
    throw new Error("Method not implemented.");
  }
  editSkill(): void {
    throw new Error("Method not implemented.");
  }
  getSkills(): void {
    throw new Error("Method not implemented.");
  }
  addSkill(): void {}

  getAbout = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const about = await this.freelancerService.getAbout(id);
      res.status(200).json({ about });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };

  async updateAbout(req: Request, res: Response) {
    try {
      const { about } = req.body;
      const { id } = req.params;

      const user = await this.freelancerService.updateAbout(id, about);
      const userDto = UserMapper.domainToGetUserDto(user);
      res.status(200).json(userDto);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
