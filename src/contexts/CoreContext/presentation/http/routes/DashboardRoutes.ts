import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";
import { Router } from "express";
import { container } from "tsyringe";
import { DashboardController } from "../controllers/DashboardController";

const controller = container.resolve(DashboardController);

const router = Router();

/**
 * @openapi
 * /stats:
 *   get:
 *     summary: Get the user stats for the dashboard
 *     tags:
 *       - Dashboard
 *     responses:
 *          200:
 *              description: Everything is ok and returns user stats
 *          500:
 *              description: Internal server error
 *
 */
router.get("/", verifyToken(), controller.getDashboardStats.bind(controller));

export default router;
