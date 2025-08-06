import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";
import { Router } from "express";
import { container } from "tsyringe";
import { DashboardController } from "../controllers/DashboardController";

const controller = container.resolve(DashboardController);

const router = Router();

/**
 * @openapi
 * /stats/teacher:
 *   get:
 *     summary: Get the teacher stats for the dashboard
 *     tags:
 *       - Dashboard
 *     responses:
 *          200:
 *              description: Everything is ok and returns user stats
 *          500:
 *              description: Internal server error
 *
 */
router.get(
  "/teacher",
  verifyToken(),
  controller.getTeacherStats.bind(controller)
);

/**
 * @openapi
 * /stats/student:
 *   get:
 *     summary: Get the student stats for the dashboard
 *     tags:
 *       - Dashboard
 *     responses:
 *          200:
 *              description: Everything is ok and returns user stats
 *          500:
 *              description: Internal server error
 *
 */
router.get(
  "/student",
  verifyToken(),
  controller.getStudentStats.bind(controller)
);

export default router;
