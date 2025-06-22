import IFreelancerController from "@/contexts/CoreContext/domain/interfaces/controllers/IFreelancerController";
import { IFreelancerService } from "@/contexts/CoreContext/domain/interfaces/services/IFreelancerService";
import { About } from "@/contexts/CoreContext/domain/valueObjects/About";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

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

  public getAbout = async (req: Request, res: Response): Promise<void> => {
    try {
      const freelancerId = req.params.freelancerId;
      const about: About | null =
        await this.freelancerService.getAbout(freelancerId);

      if (!about) {
        throw new ApiError(StatusCodes.NOT_FOUND, "About not found");
      }

      res.status(StatusCodes.OK).json({ about: about.value });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server error" });
      }
    }
  };

  public updateAbout = async (req: Request, res: Response): Promise<void> => {
    try {
      const freelancerId = req.params.freelancerId;
      const { about } = req.body;

      if (!about || typeof about !== "string") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "About text is required");
      }

      const aboutVO = About.create(about);
      await this.freelancerService.updateAbout(freelancerId, aboutVO);

      res
        .status(StatusCodes.OK)
        .json({ message: "About updated successfully" });
    } catch (error) {
      if (error instanceof Error && error.message.includes("About")) {
        throw new ApiError(StatusCodes.BAD_REQUEST, error.message);
      }
      throw error;
    }
  };
}
