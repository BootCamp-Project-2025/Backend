import { Router } from "express";
import healthController from "../controllers/healthController";

const router = Router();

/**
 * @openapi
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

/**
 * @swagger
 * /health:
 *  post:
 *      summary: Creates sample data into Data base
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          content:
 *                              type: string
 *                              example: Sample content
 *      responses:
 *          201:
 *              description: Data saved
 *          500:
 *              description: An error occured
 *
 */
router.post("", healthController.saveSampleData);

export default router;
