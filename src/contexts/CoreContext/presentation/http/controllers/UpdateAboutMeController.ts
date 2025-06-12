import { UpdateAboutMeUseCase } from "@/contexts/CoreContext/application/useCases/UpdateAboutMetUseCase";
import { Request, Response } from "express";

export class UpdateAboutMeController {
  constructor(private useCase: UpdateAboutMeUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    const { freelancerId, about } = req.body;

    if (!freelancerId || !about) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    try {
      await this.useCase.execute({ freelancerId, about });
      res.status(200).json({ message: "About me updated" });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Unexpected error" }); //Change with responses
    }
  }
}
