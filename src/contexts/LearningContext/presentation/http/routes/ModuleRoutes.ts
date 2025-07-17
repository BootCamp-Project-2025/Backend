import { Router } from "express";
import { container } from "tsyringe";
import ModuleController from "../controllers/ModuleController";
import LessonController from "../controllers/LessonController";

const moduleController = container.resolve(ModuleController);
const lessonController = container.resolve(LessonController);

const moduleRoutes = Router({ mergeParams: true });

/**
 * @openapi
 * /modules/{moduleId}/lessons:
 *   post:
 *     summary: Add a new lesson to the module
 *     tags:
 *       - Modules
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         description: The ID of the module where we want to create the lesson
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LessonDto'
 *     responses:
 *       201:
 *         description: lesson has been created
 *       400:
 *         description: the body has bad data
 *       404:
 *         description: the course couldn't be found
 *       500:
 *         description: error executing the request
 */
moduleRoutes.post("/:moduleId/lessons", lessonController.create);

/**
 * @openapi
 * /modules/{moduleId}:
 *   put:
 *     summary: Update the module with the id moduleId
 *     tags:
 *       - Modules
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         description: The ID of the module
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ModuleDto'
 *     responses:
 *       200:
 *         description: A list of courses
 */
moduleRoutes.put("/:moduleId", moduleController.update);

/**
 * @openapi
 * /modules/{moduleId}:
 *   delete:
 *     summary: Delete the module with the id moduleId
 *     tags:
 *       - Modules
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         description: The ID of the module
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: module has been deleted
 *       404:
 *         description: the module couldn't be found
 *       500:
 *         description: error executing the request
 */
moduleRoutes.delete("/:moduleId", moduleController.delete);

export default moduleRoutes;

/**
 * @openapi
 * components:
 *   schemas:
 *     ModuleDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the module
 *           example: "uu-id"
 *         title:
 *           type: string
 *           description: title of the module
 *           example: "Algebra 1"
 *         position:
 *           type: number
 *           description: Position of the module in the module
 *           example: 3
 *       required:
 *         - title
 *         - position
 */
