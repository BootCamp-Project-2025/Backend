import { Router } from "express";
import healthController from "../controllers/healthController";

const router = Router();

router.get("", healthController.getHealthStatus);

export default router;
