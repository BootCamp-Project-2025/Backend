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
 *      security:
 *       - BearerAuth: []
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
 *      security:
 *       - BearerAuth: []
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
 * /requests/{requestId}:
 *  put:
 *      summary: Update a request
 *      tags:
 *       - Requests
 *      security:
 *       - BearerAuth: []
 *      parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         description: The ID of the request
 *         schema:
 *           type: string
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request'
 *      responses:
 *          200:
 *              description: The request has been updated
 *          400:
 *              description: Invalid input
 *          404:
 *              description: Request not found
 *          500:
 *              description: Unexpected error
 */
requestRoutes.put("/:requestId", controller.update);

/**
 * @openapi
 *
 * /requests/{requestId}:
 *  delete:
 *      summary: Create a new request
 *      tags:
 *       - Requests
 *      security:
 *       - BearerAuth: []
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
 * /requests/search:
 *   get:
 *     summary: Search requests
 *     tags:
 *       - Requests
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Filter by language
 *       - in: query
 *         name: subcategory
 *         schema:
 *           type: string
 *         description: Filter by subcategory
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Filter by page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Number of results per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order of the results
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Request'
 *       400:
 *         description: Bad request parameters
 *       500:
 *         description: An unexpected error happened
 */

requestRoutes.get("/search", controller.search);

/**
 * @openapi
 *
 * /requests/{requestId}:
 *  get:
 *      summary: Get a request by ID
 *      tags:
 *       - Requests
 *      security:
 *       - BearerAuth: []
 *      parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         description: The ID of the request
 *         schema:
 *           type: string
 *      responses:
 *          200:
 *              description: Returns the requested entity
 *          404:
 *              description: Request not found
 *          401:
 *              description: Unauthorized (missing or invalid token)
 */
requestRoutes.get("/:requestId", controller.getById);

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
