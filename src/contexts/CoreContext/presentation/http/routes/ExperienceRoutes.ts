import { Router } from "express";
import { container } from "@/di-container";
import { ExperienceController } from "../controllers/ExperienceController";

export const ExperienceRoutes = Router();
const controller = container.resolve(ExperienceController);

ExperienceRoutes.get("/:id/experiences", controller.getAll.bind(controller));

ExperienceRoutes.get(
  "/:id/experiences/:experienceId",
  controller.getById.bind(controller)
);

ExperienceRoutes.post("/:id/experiences", controller.create.bind(controller));

ExperienceRoutes.put(
  "/:id/experiences/:experienceId",
  controller.update.bind(controller)
);

ExperienceRoutes.delete(
  "/:id/experiences/:experienceId",
  controller.delete.bind(controller)
);
