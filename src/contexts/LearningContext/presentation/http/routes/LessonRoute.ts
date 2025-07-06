import { Router } from "express";
import { container } from "tsyringe";
import ModuleController from "../controllers/ModuleController";

const controller = container.resolve(ModuleController);

const lessonRouter = Router({ mergeParams: true });

/**
 * @openapi
 * /courses/{courseId}/modules/{moduleId}/lessons:
 *   post:
 *     summary: Create a new lesson
 *     tags:
 *       - Lessons
 *     responses:
 *       200:
 *         description: lesson created
 */
lessonRouter.post("", controller.create);

/**
 * @openapi
 * /courses/{courseId}/modules/{moduleId}/lessons/{lessonId}:
 *   put:
 *     summary: Update a lesson
 *     tags:
 *       - Lessons
 *     responses:
 *       200:
 *         description: Updated lesson
 */
lessonRouter.put("/:lessonId", controller.update);

/**
 * @openapi
 * /courses/{courseId}/modules/{moduleId}/lessons:
 *   delete:
 *     summary: Delete a lesson
 *     tags:
 *       - Lessons
 *     responses:
 *       200:
 *         description: lesson has been deleted
 */
lessonRouter.delete("/:lessonId", controller.delete);

export default lessonRouter;
