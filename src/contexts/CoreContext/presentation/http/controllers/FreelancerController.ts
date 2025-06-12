import IFreelancerController from "@/contexts/CoreContext/domain/interfaces/controllers/IFreelancerController";
import { IFreelancerService } from "@/contexts/CoreContext/domain/interfaces/services/IFreelancerService";

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
}
