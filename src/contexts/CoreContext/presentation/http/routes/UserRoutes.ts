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
 *              description: Everything is wrong
 *
 */
router.get("/:id", controller.get);

/**
 * @openapi
 * /users:
 *  post:
 *      tags:
 *       - User
 *      summary: Create a new user by ID
 *      requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                                  userName:
 *                                      type: string
 *                                      example: Pepe
 *                                  userEmail:
 *                                      type: string
 *                                      example: Pepe@gmail.com
 *
 *      responses:
 *          201:
 *              description: Everything is ok and returns user
 *          404:
 *              description: user not found
 *          500:
 *              description: Everything is wrong
 *
 */
router.post("/", controller.post);

/**
 *
 * @openapi
 * /users:
 *  patch:
 *     summary: Updates the user data
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: Pepe
 *               profilePictureSrc:
 *                 type: string
 *                 example: "https://cdn.example.com/images/pepe.png"
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
router.put("/:id/freelance", controller.freelance);
//aca no seria mejor: router.put("/:id", controller.freelance)

export default router;
