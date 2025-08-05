import { IUserController } from "@/contexts/CoreContext/domain/interfaces/controllers/IUserController";
import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";
import { Router } from "express";
import { container } from "tsyringe";

const controller = container.resolve<IUserController>("IUserController");

const router = Router();

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
 *              description: Internal server error
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
 *              description: Internal server error
 */
router.post("/", controller.post);

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     summary: Updates user data (userName, profilePicture or about)
 *     security:
 *      - BearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", controller.updateUser);
// router.patch("/users/me", verifyToken(), controller.updateUserOwnProfile);

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
 *              description: Internal server error
 *
 */
router.put("/:id/freelance", verifyToken(), controller.freelance);

/**
 * @openapi
 * /users/{id}/chats:
 *  get:
 *     summary: Get the chats of the user with id
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *          200:
 *              description: Everything is ok and returns the user chats
 *          404:
 *              description: User not found
 *          500:
 *              description: Internal server error
 *
 */
router.get("/:userId/chats", controller.getChats);

/**
 * @openapi
 * /users/{id}/courses:
 *  get:
 *     summary: Get the courses of the user with id
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
 *              description: Everything is ok and returns the user courses
 *          404:
 *              description: User not found
 *          500:
 *              description: Internal server error
 *
 */

router.get("/:userId/courses", controller.getCourses);

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

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateUser:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           description: New username of the user
 *           example: "George Orwell"
 *         profilePicture:
 *           type: string
 *           format: uri
 *           description: URL of the profile picture
 *           example: "https://example.com/avatar.jpg"
 *         about:
 *           type: string
 *           description: Short bio or about section
 *           example: "Passionate literature teacher inspiring young minds."
 *       # No 'required' → todos los campos son opcionales
 */
