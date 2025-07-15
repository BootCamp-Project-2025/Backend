import { Router } from "express";
import { container } from "@/di-container";
import { ExperienceController } from "../controllers/ExperienceController";
import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";

export const ExperienceRoutes = Router({ mergeParams: true });
const controller = container.resolve(ExperienceController);

ExperienceRoutes.get("", controller.getAll.bind(controller));

ExperienceRoutes.post(
  "/",
  verifyToken(["FREELANCER"]),
  controller.create.bind(controller)
);

ExperienceRoutes.put(
  "/:experienceId",
  verifyToken(["FREELANCER"]),
  controller.update.bind(controller)
);

ExperienceRoutes.delete(
  "/:experienceId",
  verifyToken(["FREELANCER"]),
  controller.delete.bind(controller)
);

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Experience:
 *       type: object
 *       required:
 *         - position
 *         - employer
 *         - country
 *         - startDate
 *         - endDate
 *         - description
 *       properties:
 *         position:
 *           type: string
 *           example: Software Engineer
 *         employer:
 *           type: string
 *           example: Google
 *         country:
 *           type: string
 *           example: USA
 *         startDate:
 *           type: string
 *           format: date
 *           example: 2022-01-01
 *         endDate:
 *           type: string
 *           format: date
 *           example: 2023-12-31
 *         description:
 *           type: string
 *           example: Worked on cloud infrastructure and backend systems.
 */

/**
 * @swagger
 *
 * /freelancers/{freelancerId}/experiences:
 *   get:
 *     summary: Get all experiences by freelancer ID
 *     tags:
 *       - Experience
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: List of experiences
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Forbidden access
 */

/**
 * @swagger
 *
 * /freelancers/{freelancerId}/experiences:
 *   post:
 *     summary: Create a new experience
 *     security:
 *      - BearerAuth: []
 *     tags:
 *       - Experience
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Experience'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Experience'
 *     responses:
 *       201:
 *         description: Experience created
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Forbidden access
 */

/**
 * @swagger
 *
 * /freelancers/{freelancerId}/experiences/{experienceId}:
 *   put:
 *     summary: Update an experience
 *     security:
 *      - BearerAuth: []
 *     tags:
 *       - Experience
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: experienceId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Experience'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Experience'
 *     responses:
 *       204:
 *         description: Experience updated
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Forbidden access
 */

/**
 * @swagger
 *
 * /freelancers/{freelancerId}/experiences/{experienceId}:
 *   delete:
 *     summary: Delete an experience
 *     security:
 *      - BearerAuth: []
 *     tags:
 *       - Experience
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: experienceId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Experience deleted
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Forbidden access
 */
