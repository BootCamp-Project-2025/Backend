import { IUserController } from "@/contexts/CoreContext/domain/interfaces/controllers/IUserController";
import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";
import { Router } from "express";
import { container } from "tsyringe";

const controller = container.resolve<IUserController>("IUserController");

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
 * @openapi
 * /users/{id}:
 *  get:
 *     summary: Get the user with by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *          200:
 *              description: Everything is ok and returns user
 *          500:
 *              description: Everything is wrong
 *
 */
router.get("/:id", controller.get);

/**
 * @openapi
 * /users:
 *  post:
 *    summary: Create a new user by ID
 *    tags:
 *      - User
 *    requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *    responses:
 *          201:
 *              description: Everything is ok and returns user
 *          500:
 *              description: Everything is wrong
 */
router.post("/", controller.post);

/**
 *
 * @openapi
 * /users:
 *  patch:
 *     summary: Updates the user data
 *     security:
 *      - BearerAuth: []
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while updating the user"
 */
router.patch("/", verifyToken(), controller.updateUser);

/**
 * @openapi
 * /users/{id}/freelance:
 *  put:
 *     summary: Update the user as freelancer
 *     security:
 *      - BearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *          200:
 *              description: User enabled and freelancer profile created
 *          500:
 *              description: Everything is wrong
 *
 */
router.put("/:id/freelance", verifyToken(), controller.freelance);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           description: Name of the user
 *           example: "Juanito"
 *         userEmail:
 *           type: string
 *           description: Email of the user
 *           example: "juanito777@gmail.com"
 *         profilePictureSrc:
 *           type: string
 *           example: "https://cdn.example.com/images/pepe.png"
 *       required:
 *         - userName
 *         - userEmail
 */

router.get("/:id/enrollments", verifyToken(), controller.getEnrollments);

/**
 * @openapi
 * /users/{id}/enrollments:
 *   get:
 *     summary: Retrieve all course enrollments for a specific user
 *     description: Returns all enrollments associated with a user. Requires authentication. Validates user existence before retrieving enrollments.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
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
 *         description: Bad request – User ID is missing or invalid
 *       401:
 *         description: Unauthorized – Token is missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error while fetching enrollments
 */
