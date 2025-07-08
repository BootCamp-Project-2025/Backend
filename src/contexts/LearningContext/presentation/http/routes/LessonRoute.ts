import { Router } from "express";
import { container } from "tsyringe";
import LessonController from "../controllers/LessonController";

const controller = container.resolve(LessonController);

const lessonRouter = Router({ mergeParams: true });

/**
 * @openapi
 * /courses/modules/{moduleId}/lessons:
 *   post:
 *     summary: Create a new lesson
 *     tags:
 *       - Lessons
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
lessonRouter.post("/", controller.create);

/**
 * @openapi
 * /courses/modules/lessons/{lessonId}:
 *   put:
 *     summary: Delete a lesson
 *     tags:
 *       - Lessons
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         description: The ID of the lesson
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LessonDto'
 *     responses:
 *       200:
 *         description: lesson has been deleted
 *       400:
 *         description: the body has bad data
 *       404:
 *         description: the lesson couldn't be found
 *       500:
 *         description: error executing the request
 */
lessonRouter.put("/:lessonId", controller.update);

/**
 * @openapi
 * /courses/modules/lessons/{lessonId}:
 *   delete:
 *     summary: Delete a lesson
 *     tags:
 *       - Lessons
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         description: The ID of the lesson
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: lesson has been deleted
 *       404:
 *         description: the lesson couldn't be found
 *       500:
 *         description: error executing the request
 */
lessonRouter.delete("/:lessonId", controller.delete);

export default lessonRouter;

/**
 * @openapi
 * components:
 *   schemas:
 *     LessonDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the lesson
 *           example: "uu-id"
 *         title:
 *           type: string
 *           description: title of the lesson
 *           example: "Algebra 1"
 *         description:
 *           type: string
 *           description: Info about the course in html format
 *           example: "<p>hello <b>world</b></p>"
 *         position:
 *           type: number
 *           description: Position of the lesson in the module
 *           example: 3
 *         videoUrls:
 *           type: string[]
 *           description: list of video urls available to the lesson
 *           example: ["http://example.com"]
 *         resources:
 *           type: array
 *           items:
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *       required:
 *         - title
 *         - description
 *         - position
 *         - resources
 */
