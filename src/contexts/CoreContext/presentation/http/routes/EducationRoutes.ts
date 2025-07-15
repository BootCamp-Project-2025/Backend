import { Router } from "express";
import { container } from "tsyringe";
import EducationController from "../controllers/EducationController";
import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";

export const EducationRoutes = Router({ mergeParams: true });
const controller = container.resolve(EducationController);

/**
 * @openapi
 * /freelancers/{freelancerId}/educations:
 *   get:
 *     summary: Get all educations of a freelancer
 *     tags:
 *       - Education
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of education of the freelancer
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Forbidden access
 */
EducationRoutes.get("", controller.getAllOfFreelancer);

/**
 * @openapi
 * /freelancers/{freelancerId}/educations:
 *   post:
 *     summary: Create a new education for a freelancer
 *     security:
 *      - BearerAuth: []
 *     tags:
 *       - Education
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *     responses:
 *       201:
 *         description: Education created successfully
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Forbidden access
 */
EducationRoutes.post("", verifyToken(["FREELANCER"]), controller.create);

/**
 * @openapi
 * /freelancers/{freelancerId}/educations/{educationId}:
 *   put:
 *     summary: Update a education of a freelancer
 *     security:
 *      - BearerAuth: []
 *     tags:
 *       - Education
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *       - in: path
 *         name: educationId
 *         required: true
 *         description: The ID of the education to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *     responses:
 *       200:
 *         description: freelancer language updated
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Forbidden access
 *       404:
 *         description: freelancer or language not found
 *       500:
 *         description: Server error
 *
 */
EducationRoutes.put(
  "/:educationId",
  verifyToken(["FREELANCER"]),
  controller.update
);

/**
 * @openapi
 * /freelancers/{freelancerId}/educations/{educationId}:
 *   delete:
 *     summary: Delete an education of a freelancer
 *     security:
 *      - BearerAuth: []
 *     tags:
 *       - Education
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *       - in: path
 *         name: educationId
 *         required: true
 *         description: The ID of the education to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Education deleted successfully
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Forbidden access
 */
EducationRoutes.delete(
  "/:educationId",
  verifyToken(["FREELANCER"]),
  controller.delete
);

/**
 * @openapi
 * components:
 *   schemas:
 *     Education:
 *       type: object
 *       properties:
 *         career:
 *           type: string
 *           description: Name of the studied career
 *           example: "Systems engineering"
 *         university:
 *           type: string
 *           description: University where the user studied
 *           example: "MIT"
 *         startDate:
 *           type: date
 *           format: date-time
 *           description: Date in format YYYY-MM-DD
 *           example: 2018-02-01
 *         finishDate:
 *           type: date
 *           format: date-time
 *           description: Date in format YYYY-MM-DD
 *           example: 2023-12-01
 *       required:
 *         - career
 *         - university
 *         - startDate
 *         - finishDate
 */
