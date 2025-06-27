import { IUserController } from "@/contexts/CoreContext/domain/interfaces/controllers/IUserController";
import { Router } from "express";
import { container } from "tsyringe";

const controller = container.resolve<IUserController>("IUserController");

const router = Router();

/**
 * @openapi
 * /users/:id:
 *  get:
 *      summary: Retrieves the user with the id :id
 *      responses:
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
 *      summary: saves the user with the id :id
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
 * @openapi
 * /users/:id/freelance:
 *  put:
 *      summary: Enables the user as freelancer with the id :id
 *      responses:
 *          200:
 *              description: User enabled and freelancer profile created
 *          500:
 *              description: Everything is wrong
 *
 */
router.put("/:id/freelance", controller.freelance);

/**
 * @openapi
 * /users/{id}/profile:
 *   get:
 *     summary: Retrieves the profile data of a user (client or freelancer) by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve the profile for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile data successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   example: "Pepe"
 *                 userEmail:
 *                   type: string
 *                   example: "pepe@gmail.com"
 *                 profilePictureSrc:
 *                   type: string
 *                   example: "https://cdn.example.com/images/pepe.png"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/:id/profile", controller.getUserProfile);

export default router;
