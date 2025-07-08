import { Router } from "express";
import { container } from "tsyringe";
import EducationController from "../controllers/EducationController";

const controller = container.resolve(EducationController);

const router = Router();

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
 */
router.get("", controller.getAllOfFreelancer);

/**
 * @openapi
 * /freelancers/{freelancerId}/educations:
 *   post:
 *     summary: Create a new education for a freelancer
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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EducationDTO'
 *     responses:
 *       201:
 *         description: Education created successfully
 */
router.post("", controller.create);

/**
 * @openapi
 * /freelancers/{freelancerId}/educations/{educationId}:
 *   delete:
 *     summary: Delete an education of a freelancer
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
 *         description: The ID of the certification to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Education deleted successfully
 */
router.delete("/:educationId", controller.delete);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     EducationDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the certification
 *           example: "abc123"
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
