import { Router } from "express";
import { container } from "tsyringe";
import ModuleController from "../controllers/ModuleController";
import lessonRouter from "./LessonRoute";

const controller = container.resolve(ModuleController);

const moduleRouter = Router({ mergeParams: true });

moduleRouter.use("/:moduleId/lessons", lessonRouter);
moduleRouter.use("/lessons", lessonRouter);
/**
 * @openapi
 * /courses/{courseId}/modules:
 *   get:
 *     summary: Get all the modules of a course
 *     tags:
 *       - Modules
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of courses
 */
moduleRouter.get("/", controller.getAll);

/**
 * @openapi
 * /courses/{courseId}/modules:
 *   post:
 *     summary: Create a new module
 *     tags:
 *       - Modules
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
moduleRouter.post("/", controller.create);

/**
 * @openapi
 * /courses/modules/{moduleId}:
 *   put:
 *     summary: Update a module
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
moduleRouter.put("/:moduleId", controller.update);

/**
 * @openapi
 * /courses/modules/{moduleId}:
 *   delete:
 *     summary: Delete a module
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
moduleRouter.delete("/:moduleId", controller.delete);

export default moduleRouter;

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
