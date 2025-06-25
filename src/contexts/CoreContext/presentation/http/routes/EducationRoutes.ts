import { Router } from "express";
import { container } from "tsyringe";
import EducationController from "../controllers/EducationController";

const controller = container.resolve(EducationController);

const router = Router();

router.get("", controller.getAllOfFreelancer);

router.post("", controller.create);

router.delete("/:educationId", controller.delete);

export default router;
