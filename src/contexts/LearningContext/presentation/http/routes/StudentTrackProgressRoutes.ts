import { Router } from "express";
import { container } from "tsyringe";
import StudentTrackProgressController from "../controllers/StudentTrackProgressController ";

const controller = container.resolve(StudentTrackProgressController);

const studentTrackProgressRoutes = Router({ mergeParams: true });

/**
 * @openapi
 * /student-track-progress/{trackId}:
 *   put:
 *     summary: Update a student track progress
 *     tags: [StudentTrackProgress]
 *     parameters:
 *       - in: path
 *         name: trackId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentTrackProgressDto'
 *     responses:
 *       200:
 *         description: StudentTrackProgress updated
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
studentTrackProgressRoutes.put("/:trackId", controller.update);

/**
 * @openapi
 * /student-track-progress/{trackId}:
 *   delete:
 *     summary: Delete a student track progress
 *     tags: [StudentTrackProgress]
 *     parameters:
 *       - in: path
 *         name: trackId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: StudentTrackProgress deleted
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
studentTrackProgressRoutes.delete("/:trackId", controller.delete);

/**
 * @openapi
 * /student-track-progress/enrollment/{enrollmentId}:
 *   get:
 *     summary: Get student progress and percentage for enrollment
 *     tags: [StudentTrackProgress]
 *     parameters:
 *       - in: path
 *         name: enrollmentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student progress data
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
studentTrackProgressRoutes.get(
  "/enrollment/:enrollmentId",
  controller.getByEnrollment
);

/**
 * @openapi
 * /student-track-progress/{trackId}:
 *   get:
 *     summary: Get student track progress by id
 *     tags: [StudentTrackProgress]
 *     parameters:
 *       - in: path
 *         name: trackId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: StudentTrackProgress found
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
studentTrackProgressRoutes.get("/:trackId", controller.getById);

/**
 * @openapi
 * /student-track-progress/{enrollmentId}:
 *   post:
 *     summary: Create student track progress
 *     tags: [StudentTrackProgress]
 *     parameters:
 *       - in: path
 *         name: enrollmentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentTrackProgressDto'
 *     responses:
 *       201:
 *         description: StudentTrackProgress created
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Internal server error
 */
studentTrackProgressRoutes.post("/:enrollmentId", controller.create);

export default studentTrackProgressRoutes;

/**
 * @openapi
 * components:
 *   schemas:
 *     StudentTrackProgressDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         enrollmentId:
 *           type: string
 *         lessonId:
 *           type: string
 *         videoProgresses:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               watchedSeconds:
 *                 type: number
 *               completed:
 *                 type: boolean
 *         resourcesCompleted:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *         completed:
 *           type: boolean
 *         completedAt:
 *           type: string
 *           format: date-time
 */
