import { IEducationController } from "@/contexts/CoreContext/domain/interfaces/controllers/IEducationController";
import { Router } from "express";
import { container } from "tsyringe";
import { EducationController } from "../controllers/EducationController";

const router = Router();

const controller: IEducationController = container.resolve(EducationController);

router.get("", controller.getAll);
router.get(":id", controller.getById);
router.post("", controller.create);
router.put(":id", controller.update);
router.delete(":id", controller.deleteById);

export default router;
