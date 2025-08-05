import { Router } from "express";
import { container } from "tsyringe";
import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";
import { P2PCourseController } from "../controllers/P2PCourseController";

const p2pCourseController = container.resolve(P2PCourseController);
const p2pCourseRoutes = Router({ mergeParams: true });

/**
 * @openapi
 * /p2pCourses:
 *   post:
 *     summary: Create a new p2p course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/P2PCourseDto'
 *     tags:
 *       - P2PCourses
 */
p2pCourseRoutes.post("/", verifyToken(), p2pCourseController.create);

/**
 * @openapi
 * /p2pCourses/{p2pCourseId}/userCourse:
 *   get:
 *     summary: Get the course if the user is part of the course
 *     tags:
 *       - P2PCourses
 *     responses:
 *       200:
 *         description: Returns the course
 *       404:
 *         description: The course does not exit
 *       500:
 *         description: Internal server error
 */
p2pCourseRoutes.get(
  "/:p2pCourseId/userCourse",
  verifyToken(),
  p2pCourseController.getByUserIdAndCourseId
);

/**
 * @openapi
 * /p2pCourses/{p2pCourseId}/posts:
 *   post:
 *     summary: Create a new post in the p2p course
 *     tags:
 *       - P2PCourses
 *     parameters:
 *       - in: path
 *         name: p2pCourseId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostDto'
 *     responses:
 *       201:
 *         description: The posts was created correctly in the course
 *       400:
 *         description: The data is incorrect
 *       409:
 *         description: The data conficts with other records
 *       500:
 *         description: Internal server error
 */
p2pCourseRoutes.post(
  "/:p2pCourseId/posts",
  verifyToken(["FREELANCER"]),
  p2pCourseController.addPost
);

/**
 * @openapi
 * /p2pCourses/{p2pCourseId}/posts/{postId}:
 *   put:
 *     summary: Update the a post in the p2p course
 *     tags:
 *       - P2PCourses
 *     parameters:
 *       - in: path
 *         name: p2pCourseId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostDto'
 *     responses:
 *       200:
 *         description: The posts was updated correctly in the course
 *       400:
 *         description: The data is incorrect
 *       409:
 *         description: The data conficts with other records
 *       500:
 *         description: Internal server error
 */
p2pCourseRoutes.put(
  "/:p2pCourseId/posts/:postId",
  verifyToken(["FREELANCER"]),
  p2pCourseController.editPost
);

/**
 * @openapi
 * /p2pCourses/{p2pCourseId}/posts/{postId}:
 *   delete:
 *     summary: Deletes a post in the p2p course
 *     tags:
 *       - P2PCourses
 *     parameters:
 *       - in: path
 *         name: p2pCourseId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostDto'
 *     responses:
 *       200:
 *         description: The posts was deleted correctly of the course
 *       500:
 *         description: Internal server error
 */
p2pCourseRoutes.delete(
  "/:p2pCourseId/posts/:postId",
  verifyToken(["FREELANCER"]),
  p2pCourseController.removePost
);

/**
 * @openapi
 * /p2pCourses/{p2pCourseId}/sessions:
 *   post:
 *     summary: Create a new session in the p2p course
 *     tags:
 *       - P2PCourses
 *     parameters:
 *       - in: path
 *         name: p2pCourseId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SessionDto'
 *     responses:
 *       201:
 *         description: The session was created correctly on the course
 *       400:
 *         description: The data is incorrect
 *       500:
 *         description: Internal server error
 */
p2pCourseRoutes.post(
  "/:p2pCourseId/sessions",
  verifyToken(["FREELANCER"]),
  p2pCourseController.addSession
);

/**
 * @openapi
 * /p2pCourses/{p2pCourseId}/sessions/{sessionId}:
 *   put:
 *     summary: Updates a session in the p2p course
 *     tags:
 *       - P2PCourses
 *     parameters:
 *       - in: path
 *         name: p2pCourseId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SessionDto'
 *     responses:
 *       200:
 *         description: The session was updated correctly on the course
 *       400:
 *         description: The data is incorrect
 *       409:
 *         description: The data conficts with other records
 *       500:
 *         description: Internal server error
 */
p2pCourseRoutes.put(
  "/:p2pCourseId/sessions/:sessionId",
  verifyToken(["FREELANCER"]),
  p2pCourseController.editSession
);

/**
 * @openapi
 * /p2pCourses/{p2pCourseId}/sessions/{sessionId}:
 *   delete:
 *     summary: Removes a session of the p2p course
 *     tags:
 *       - P2PCourses
 *     parameters:
 *       - in: path
 *         name: p2pCourseId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The session was delete correctly of the course
 *       500:
 *         description: Internal server error
 */
p2pCourseRoutes.delete(
  "/:p2pCourseId/sessions/:sessionId",
  verifyToken(["FREELANCER"]),
  p2pCourseController.removeSession
);

/**
 * @openapi
 * /p2pCourses/{p2pCourseId}/sessions/{sessionId}/complete:
 *   patch:
 *     summary: Updates the status of a session to completed
 *     tags:
 *       - P2PCourses
 *     parameters:
 *       - in: path
 *         name: p2pCourseId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The session status was set to completed on the course
 *       409:
 *         description: The request conficts with other records
 *       500:
 *         description: Internal server error
 */
p2pCourseRoutes.patch(
  "/:p2pCourseId/sessions/:sessionId/complete",
  verifyToken(["FREELANCER"]),
  p2pCourseController.completeSession
);

/**
 * @openapi
 * /p2pCourses/{p2pCourseId}/files:
 *   post:
 *     summary: Create a new filePost in the p2p course
 *     tags:
 *       - P2PCourses
 *     parameters:
 *       - in: path
 *         name: p2pCourseId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilePostDto'
 *     responses:
 *       201:
 *         description: The filePost was created correctly on the course
 *       400:
 *         description: The data is incorrect
 *       500:
 *         description: Internal server error
 */
p2pCourseRoutes.post(
  "/:p2pCourseId/files",
  verifyToken(["FREELANCER"]),
  p2pCourseController.addFilePost
);

/**
 * @openapi
 * /p2pCourses/{p2pCourseId}/files/{fileId}:
 *   delete:
 *     summary: Deletes a filePost in the p2p course
 *     tags:
 *       - P2PCourses
 *     parameters:
 *       - in: path
 *         name: p2pCourseId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The filePost was deleted correctly of the course
 *       500:
 *         description: Internal server error
 */
p2pCourseRoutes.delete(
  "/:p2pCourseId/files/:filePostId",
  verifyToken(["FREELANCER"]),
  p2pCourseController.removeFilePost
);

export default p2pCourseRoutes;

/**
 * @openapi
 * components:
 *   schemas:
 *     P2PCourseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the p2p Course
 *           example: "c392aeef-7312-438b-ac28-7c93f0c261bb"
 *         name:
 *           type: string
 *           description: Name of the course
 *           example: "Advance mathematics"
 *         sessions:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/SessionDto'
 *             description: Sessions of the course
 *         posts:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/PostDto'
 *             description: Sessions of the course
 *         files:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/FilePostDto'
 *             description: Sessions of the course
 *       required:
 *         - name
 *
 *     SessionDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the session
 *           example: "c392aeef-7312-438b-ac28-7c93f0c261bb"
 *         dateOfTheSession:
 *           type: string
 *           format: date
 *           example: 2025-02-01
 *         creationDate:
 *           type: string
 *           format: date
 *           example: 2025-01-01
 *         url:
 *           type: string
 *           description: Link of meeting room
 *           example: "https://meet.google.com/landing?pli=1"
 *         status:
 *           type: string
 *           description: Status of the meeting
 *           example: "PENDING"
 *           default: "PENDING"
 *           enum:
 *             - PENDING
 *             - COMPLETED
 *             - CANCELED
 *       required:
 *         - dateOfTheSession
 *         - creationDate
 *         - url
 *         - status
 *
 *     PostDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the post
 *           example: "c392aeef-7312-438b-ac28-7c93f0c261bb"
 *         title:
 *           type: string
 *           description: title of the post
 *           example: "Algebra 1"
 *         description:
 *           type: string
 *           description: Description of the post
 *           example: "Algebra 1 can be a challenging subject so you could check out this resource"
 *         url:
 *           type: string
 *           description: Link of the resource
 *           example: "https://www.youtube.com/"
 *         creationDate:
 *           type: string
 *           format: date
 *           example: 2025-01-01
 *       required:
 *         - title
 *         - creationDate
 *
 *     FilePostDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the file
 *           example: "c392aeef-7312-438b-ac28-7c93f0c261bb"
 *         url:
 *           type: string
 *           description: Url of the file in the cdn
 *           example: "https://res.cloudinary.com/ltcrowd-cdn/raw/upload/v1754245286/mgik0wk9nl9ksqlm1hve.pdf"
 *       required:
 *         - url
 */
