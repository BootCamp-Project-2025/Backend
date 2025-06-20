import { Router } from "express";
import userController from "../UserMain";

const router = Router();

const controller = userController;

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
 * /users/:
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

router.get("/:id/profile", controller.getProfile);

export default router;
