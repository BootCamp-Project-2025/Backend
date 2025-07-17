import { Router } from "express";
import { container } from "@/di-container";
import { ChatController } from "../controllers/ChatController";
import { MessageController } from "../controllers/MessageController";

export const chatRoutes = Router({ mergeParams: true });
const chatController = container.resolve(ChatController);
const messageController = container.resolve(MessageController);

/**
 * @openapi
 * /chats:
 *  post:
 *      summary: Create a new chat between users
 *      tags:
 *       - Chat
 *      requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *      responses:
 *          201:
 *              description: Everything is ok and returns new chat
 *          500:
 *              description: Everything is wrong
 *
 */
chatRoutes.post("", chatController.create);

/**
 * @openapi
 * /chats/{chatId}/messages:
 *   get:
 *     summary: Get chat messages
 *     tags:
 *       - Chat
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         description: The ID of the chat
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chats found
 *       404:
 *         description: Chats not found
 *       500:
 *         description: Server error
 *
 */
chatRoutes.get("/:chatId/messages", messageController.getMessagesByChatId);

/**
 * @openapi
 * /chats/{chatId}/messages:
 *   post:
 *     summary: Create chat message
 *     tags:
 *       - Chat
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         description: The ID of the chat
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: Message created successfully
 *       404:
 *         description: chat not found
 *       500:
 *         description: Server error
 *
 */
chatRoutes.post("/:chatId/messages", messageController.create);

/**
 * @openapi
 * /chats/{chatId}/users/{userId}/messages/status:
 *   put:
 *     summary: Update the status of messages in chat
 *     tags:
 *       - Chat
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         description: The ID of the chat
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user who has seen the messages
 *     responses:
 *       204:
 *         description: Message status in chat updated successfully
 *       500:
 *         description: Server error
 *
 */
chatRoutes.put(
  "/:chatId/users/:userId/messages/status",
  messageController.updateMessageStatus
);

/**
 * @openapi
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the chat to display
 *           example: "Awesome chat"
 *         participantsIds:
 *           type: array
 *           items:
 *             type: string
 *           description: The Ids of the users participants of the chat
 *       required:
 *         - participantsIds
 *
 *     Message:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: Content of the message
 *           example: "This is my first message!"
 *         type:
 *           type: string
 *           description: Type of sent message
 *           example: "TEXT"
 *           default: "TEXT"
 *           enum:
 *             - TEXT
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Time when the message has been sent
 *         senderId:
 *           type: string
 *           description: Id of the user who sent the message
 *         chatId:
 *           type: string
 *           description: Id of the chat
 *       required:
 *         - content
 *         - type
 *         - timestamp
 *         - senderId
 *         - chatId
 */
