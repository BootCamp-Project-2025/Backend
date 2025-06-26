import { Router } from "express";
import { container } from "@/di-container";
import { ExperienceController } from "../controllers/ExperienceController";

export const ExperienceRoutes = Router({ mergeParams: true });
const controller = container.resolve(ExperienceController);

ExperienceRoutes.get("", controller.getAll.bind(controller));

ExperienceRoutes.get("/:experienceId", controller.getById.bind(controller));

ExperienceRoutes.post("/", controller.create.bind(controller));

ExperienceRoutes.put("/:experienceId", controller.update.bind(controller));

ExperienceRoutes.delete("/:experienceId", controller.delete.bind(controller));

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
 *         employer:
 *           type: string
 *         country:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *         description:
 *           type: string
 */

/**
 * @swagger
 *
 * /{idFreelancer}/experiences:
 *   get:
 *     summary: Get all experiences by freelancer ID
 *     parameters:
 *       - in: path
 *         name: idFreelancer
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: List of experiences
 */

/**
 * @swagger
 *
 * /{idFreelancer}/experiences/{experienceId}:
 *   get:
 *     summary: Get an experience by ID
 *     parameters:
 *       - in: path
 *         name: idFreelancer
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: experienceId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Single experience
 */

/**
 * @swagger
 *
 * /{idFreelancer}/experiences:
 *   post:
 *     summary: Create a new experience
 *     parameters:
 *       - in: path
 *         name: idFreelancer
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Experience'
 *     responses:
 *       201:
 *         description: Experience created
 */

/**
 * @swagger
 *
 * /{idFreelancer}/experiences/{experienceId}:
 *   put:
 *     summary: Update an experience
 *     parameters:
 *       - in: path
 *         name: idFreelancer
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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Experience'
 *     responses:
 *       204:
 *         description: Experience updated
 */

/**
 * @swagger
 *
 * /{idFreelancer}/experiences/{experienceId}:
 *   delete:
 *     summary: Delete an experience
 *     parameters:
 *       - in: path
 *         name: idFreelancer
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
 */
