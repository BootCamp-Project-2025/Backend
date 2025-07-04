import { Router } from "express";
import { container } from "tsyringe";
import ModuleController from "../controllers/ModuleController";

const controller = container.resolve(ModuleController);

const moduleRouter = Router({ mergeParams: true });

/**
 * @openapi
 * /courses/{courseId}/modules:
 *   get:
 *     summary: Get all the modules of a course
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: A list of courses
 */
moduleRouter.get("", controller.getAll);

/**
 * @openapi
 * /courses/{courseId}/modules:
 *   post:
 *     summary: Create a new module
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: A list of courses
 */
moduleRouter.post("", controller.create);

/**
 * @openapi
 * /courses/{courseId}/modules/{moduleId}:
 *   put:
 *     summary: Update a module
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: A list of courses
 */
moduleRouter.put("/:moduleId", controller.update);

/**
 * @openapi
 * /courses/{courseId}/modules/{moduleId}:
 *   delete:
 *     summary: Delete a module
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: A list of courses
 */
moduleRouter.delete("/:moduleId", controller.delete);

export default moduleRouter;
