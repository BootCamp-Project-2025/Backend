import { Router } from "express";
import userController from "../UserMain";

const router = Router();

const controller = userController;

router.get("/", controller.getUser);

router.post("/", controller.post);

export default router;
