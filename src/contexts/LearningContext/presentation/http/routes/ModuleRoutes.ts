import { Router } from "express";
import { container } from "tsyringe";
import ModuleController from "../controllers/ModuleController";

const controller = container.resolve(ModuleController);

const moduleRouter = Router();

moduleRouter.get("/", controller.getAll);

moduleRouter.post("/", controller.create);

moduleRouter.put("/{moduleId}", controller.update);

moduleRouter.delete("/{moduleId}", controller.delete);

export default moduleRouter;
