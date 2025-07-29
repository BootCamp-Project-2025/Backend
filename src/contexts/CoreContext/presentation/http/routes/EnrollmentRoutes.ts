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
 * /enrollments/user/{userId}:
 *   get:
 *     summary: Retrieve all course enrollments for a specific user
 *     description: Returns all enrollments associated with a user. Requires authentication. Validates user existence before retrieving enrollments.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Enrollment
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user
 *         schema:
 *           type: string
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
 *         description: Bad request – userId is missing or invalid
 *       401:
 *         description: Unauthorized – Token is missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error while fetching enrollments
 */

router.get("/user/:userId", verifyToken(), controller.getEnrollments);

export default router;
