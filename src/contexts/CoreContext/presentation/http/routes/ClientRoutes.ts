import { IClientController } from "@/contexts/CoreContext/domain/interfaces/controllers/IClientController";
//import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";
import { Router } from "express";
import { container } from "tsyringe";

const controller = container.resolve<IClientController>("IClientController");

const router = Router();

/**
 * @openapi
 * /clients/{id}:
 *  get:
 *     summary: Get a client by ID
 *     tags:
 *       - Client
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client retrieved successfully
 *       400:
 *         description: Client not found
 *       500:
 *         description: Server error
 */
router.get("/:id", controller.get);

/**
 * @openapi
 * /clients/{id}:
 *  put:
 *     summary: Update client by ID
 *     tags:
 *       - Client
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientProfileDto'
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       400:
 *         description: Invalid input or client not found
 *       500:
 *         description: Server error
 */
router.put("/:id", controller.update);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     SocialLinkDto:
 *       type: object
 *       properties:
 *         platform:
 *           type: string
 *           description: Name of the social media platform (e.g., "YOUTUBE")
 *           example: "LINKEDIN"
 *         url:
 *           type: string
 *           description: URL to the user's profile, must be a valid URL
 *           example: "https://linkedin.com/in/example"
 *       required:
 *         - platform
 *         - url
 *
 *     ClientProfileDto:
 *       type: object
 *       properties:
 *         phoneNumber:
 *           type: string
 *           description: Phone number in international format, e.g., +54 911 1234-5678
 *           example: "+54 911 1234-5678"
 *         city:
 *           type: string
 *           description: City of residence, free text
 *           example: "Buenos Aires"
 *         country:
 *           type: string
 *           description: Country of residence, free text
 *           example: "Argentina"
 *         gender:
 *           type: string
 *           description: Gender identity, e.g., "male", "female", "other"
 *           example: "male"
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: Date of birth in YYYY-MM-DD format
 *           example: "1995-07-17"
 *         socialLinks:
 *           type: array
 *           description: List of the client's social media profiles
 *           items:
 *             $ref: '#/components/schemas/SocialLinkDto'
 *       required:
 *         - userId
 */
