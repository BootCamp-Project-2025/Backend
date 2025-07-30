import { container } from "tsyringe";
import { EnrollmentController } from "../controllers/EnrollmentController";
import { Router } from "express";
import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";

const controller = container.resolve(EnrollmentController);
const router = Router();
/**
 * @openapi
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the enrollment
 *           example: "enrollment-623"
 *         courseId:
 *           type: string
 *           example: "course-123"
 *         userId:
 *           type: string
 *           example: "user-456"
 *         status:
 *           type: string
 *           enum: [ENROLLED, COMPLETED, CANCELED]
 *           example: "ENROLLED"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-07-23T14:45:00.000Z"
 */

/**
 *  @openapi
 *  /enrollments:
 *    post:
 *      summary: Create a new enrollment
 *      security:
 *       - BearerAuth: []
 *      tags:
 *        - Enrollment
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: string
 *                courseId:
 *                  type: string
 *      responses:
 *        '201':
 *          description: Enrollment created successfully
 *        '400':
 *          description: Bad request
 *        '401':
 *          description: Missing or invalid authentication token
 *        '403':
 *          description: Forbidden
 *        '404':
 *          description: Course or user not found
 *        '409':
 *          description: Enrollment already exists
 */

router.post("/", verifyToken(), controller.createEnrollment);

/**
 * @openapi
 *  /enrollments/{id}:
 *    put:
 *      summary: Cancel an enrollment
 *      security:
 *       - BearerAuth: []
 *      tags:
 *        - Enrollment
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the enrollment to cancel
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Enrollment canceled successfully
 *        '400':
 *          description: Bad request
 *        '401':
 *          description: Missing or invalid authentication token
 *        '403':
 *          description: Forbidden
 *        '404':
 *          description: Enrollment not found
 */
router.put("/:id", verifyToken(), controller.cancelEnrollment);
/**
 * @openapi
 * /enrollments/{userId}/{courseId}:
 *   get:
 *     summary: Get enrollment details for a user in a course
 *     tags:
 *       - Enrollment
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - name: courseId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *     responses:
 *       '200':
 *         description: Enrollment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     isEnrolled:
 *                       type: boolean
 *                       example: true
 *                     enrollment:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         userId:
 *                           type: string
 *                         courseId:
 *                           type: string
 *                         status:
 *                           type: string
 *                           enum: [ENROLLED, COMPLETED]
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *       '404':
 *         description: User, course, or enrollment not found
 *       '400':
 *         description: Invalid userId or courseId
 *       '401':
 *         description: Unauthorized
 */

router.get("/:userId/:courseId", verifyToken(), controller.checkEnrollment);

/**
 * @openapi
 * /enrollments/user:
 *   get:
 *     summary: Retrieve all course enrollments for the authenticated user
 *     description: Returns all enrollments associated with the authenticated user. Requires a valid Bearer token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Enrollment
 *     responses:
 *       200:
 *         description: Enrollments successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Enrollment'
 *       400:
 *         description: Bad request – User ID is missing in token
 *       401:
 *         description: Unauthorized – Token is missing or invalid
 *       500:
 *         description: Internal server error while fetching enrollments
 */

router.get("/user", verifyToken(), controller.getEnrollments);

export default router;
