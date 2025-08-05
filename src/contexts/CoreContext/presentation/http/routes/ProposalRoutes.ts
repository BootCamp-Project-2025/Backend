import { Router } from "express";
import { container } from "tsyringe";
import { ProposalController } from "../controllers/ProposalController";

export const proposalRoutes = Router();
const proposalController = container.resolve(ProposalController);

/**
 * @openapi
 * /proposals:
 *  post:
 *      summary: Create a new proposal
 *      tags:
 *       - Proposal
 *      requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Proposal'
 *           encoding:
 *             sessions:
 *               style: form
 *               explode: true
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proposal'
 *      responses:
 *          201:
 *              description: Everything is ok and returns new proposal
 *          500:
 *              description: Everything is wrong
 *
 */
proposalRoutes.post("", proposalController.create);

/**
 * @openapi
 * /proposals/{proposalId}:
 *   put:
 *     summary: Update the proposal
 *     tags:
 *       - Proposal
 *     parameters:
 *       - in: path
 *         name: proposalId
 *         required: true
 *         description: The ID of the proposal
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Proposal'
 *           encoding:
 *              sessions:
 *                  style: form
 *                  explode: true
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proposal'
 *     responses:
 *       204:
 *         description: Message status in chat updated successfully
 *       500:
 *         description: Server error
 *
 */
proposalRoutes.put("/:proposalId", proposalController.update);

/**
 * @openapi
 * components:
 *   schemas:
 *     Proposal:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Id of the proposal
 *         requestId:
 *           type: string
 *           format: uuid
 *           description: Id of the request
 *         userId:
 *           type: string
 *           format: uuid
 *           description: Id of the user who makes the proposal
 *         chatId:
 *           type: string
 *           format: uuid
 *           description: Id of the chat where the proposal is from
 *         description:
 *           type: string
 *           description: Description of the proposal
 *           example: "My awesome description for an awesome proposal"
 *         status:
 *           type: string
 *           description: Status of the proposal
 *           example: "NEW"
 *           default: "NEW"
 *           enum:
 *             - NEW
 *             - SENT
 *             - ACCEPTED
 *             - REJECTED
 *         sessions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *              title:
 *                  type: string
 *                  description: Title of the session
 *              datetime:
 *                  type: string
 *                  format: date-time
 *                  description: Time of the session
 */
