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
 * /enrollments/course/{courseId}:
 *   get:
 *     summary: Check if the authenticated user is enrolled in a specific course
 *     description: |
 *       Returns whether the authenticated user is enrolled in the specified course.
 *       If the user is enrolled, detailed enrollment information is returned.
 *       If not, the `isEnrolled` field will be false and `enrollment` will be null.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Enrollment
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to check enrollment for.
 *     responses:
 *       '200':
 *         description: Enrollment status retrieved successfully
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
 *                       description: Indicates whether the user is currently enrolled in the course
 *                       example: true
 *                     enrollment:
 *                       type: object
 *                       nullable: true
 *                       description: Enrollment details if the user is enrolled
 *                       properties:
 *                         id:
 *                           type: string
 *                         userId:
 *                           type: string
 *                         courseId:
 *                           type: string
 *                         status:
 *                           type: string
 *                           enum: [ENROLLED, COMPLETED, CANCELED]
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *             examples:
 *               Enrolled:
 *                 summary: User is enrolled
 *                 value:
 *                   data:
 *                     isEnrolled: true
 *                     enrollment:
 *                       id: "abc123"
 *                       userId: "user456"
 *                       courseId: "course789"
 *                       status: "ENROLLED"
 *                       createdAt: "2025-07-31T02:36:14.533Z"
 *               NotEnrolled:
 *                 summary: User is not enrolled
 *                 value:
 *                   data:
 *                     isEnrolled: false
 *                     enrollment: null
 *       '400':
 *         description: Invalid courseId or missing user ID
 *       '401':
 *         description: Unauthorized – missing or invalid authentication token
 *       '404':
 *         description: Course or user not found
 *       '500':
 *         description: Internal server error
 */

router.get("/course/:courseId", verifyToken(), controller.checkEnrollment);

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
