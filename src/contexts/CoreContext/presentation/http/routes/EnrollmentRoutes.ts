import { container } from "tsyringe";
import { EnrollmentController } from "../controllers/EnrollmentController";
import { Router } from "express";
import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";

const controller = container.resolve(EnrollmentController);
const router = Router();

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

export default router;
