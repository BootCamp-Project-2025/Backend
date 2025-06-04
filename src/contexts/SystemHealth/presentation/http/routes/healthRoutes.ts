import { Router } from "express";
import healthController from "../controllers/healthController";

const router = Router();

/**
 * @swagger
 * /health:
 *  get:
 *      summary: Retrieves the API health status
 *      responses:
 *          200:
 *              description: Everything is ok
 *          500:
 *              description: Everything is wrong
 *
 */
router.get("", healthController.getHealthStatus);

export default router;
