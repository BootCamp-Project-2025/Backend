import { Router } from "express";
import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";
import { container } from "@/di-container";
import { RequestController } from "../controllers/RequestController";

export const requestRoutes = Router({ mergeParams: true });
const controller = container.resolve(RequestController);

/**
 * @openapi
 *
 * /requests/validUserRequests:
 *  get:
 *      summary: Get all the valid request of the user
 *      tags:
 *       - Requests
 *      responses:
 *          200:
 *              description: Everything is ok and returns the list
 *          400:
 *              description: There is something bad with the request
 *          500:
 *              description: An unexpected error happened
 *
 */
requestRoutes.get(
  "/validUserRequests",
  verifyToken(),
  controller.getUserActiveRequest
);

/**
 * @openapi
 *
 * /requests:
 *  post:
 *      summary: Create a new request
 *      tags:
 *       - Requests
 *      requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Request'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request'
 *      responses:
 *          201:
 *              description: The request has been created and returns the created request
 *          400:
 *              description: There is something bad with the request
 *          500:
 *              description: An unexpected error happened
 *
 */
requestRoutes.post("/", verifyToken(), controller.create);

/**
 * @openapi
 *
 * /requests{requestId}:
 *  delete:
 *      summary: Create a new request
 *      tags:
 *       - Requests
 *      parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         description: The ID of the request
 *         schema:
 *           type: string
 *      responses:
 *          200:
 *              description: Everything is ok and returns the created request
 *          404:
 *              description: There request does not exist
 *          500:
 *              description: An unexpected error happened
 *
 */
requestRoutes.delete("/:requestId", controller.delete);

/**
 * @openapi
 * components:
 *   schemas:
 *     Request:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Id of the request
 *           example: "21321d13fef-fewfwcew-eewe"
 *         title:
 *           type: string
 *           description: Title of the request
 *           example: "Course for learning PHP"
 *         description:
 *           type: string
 *           description: Description of the request
 *           example: "I need a course for learning the basics of PHP"
 *         language:
 *           type: string
 *           description: Language of the request
 *           example: "Spanish"
 *         category:
 *           type: string
 *           description: Category of the request
 *           example: "Programing"
 *         subCategory:
 *           type: string
 *           description: SubCategory of the request
 *           example: "Web development"
 *         userId:
 *           type: string
 *           description: Id of the user that created the request
 *           example: "Spanish"
 *         estimation:
 *           type: number
 *           description: estimation of the request
 *           example: "10"
 *         edited:
 *           type: boolean
 *           description: show if the request was edited
 *           example: "false"
 *         createdAt:
 *           type: date
 *           description: when was the request created
 *           example: "10-20-2000"
 *         updatedAt:
 *           type: date
 *           description: When was the las time the request was edited
 *           example: "9-20-2000"
 *         status:
 *           type: string
 *           description: What is the status of the request
 *           example: "CANCELED"
 *           default: "AVAILABLE"
 *           enum:
 *             - PENDING
 *             - AVAILABLE
 *             - ACCEPTED
 *             - CANCELED
 *       required:
 *         - title
 *         - description
 *         - language
 *         - category
 *         - subCategory
 */
