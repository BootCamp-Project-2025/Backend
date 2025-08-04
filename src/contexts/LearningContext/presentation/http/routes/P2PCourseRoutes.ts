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
 *     tags:
 *       - P2PCourses
 */
p2pCourseRoutes.post("/", verifyToken(), p2pCourseController.create);

/**
 * @openapi
 * /p2pCourses/:p2pCourseId/userCourse:
 *   get:
 *     summary: Get the course if the user is part of the course
 *     tags:
 *       - P2PCourses
 */
p2pCourseRoutes.get(
  "/:p2pCourseId/userCourse",
  verifyToken(),
  p2pCourseController.getByUserIdAndCourseId
);

/**
 * @openapi
 * /p2pCourses/:p2pCourseId/posts:
 *   post:
 *     summary: Create a new post in the p2p course
 *     tags:
 *       - P2PCourses
 */
p2pCourseRoutes.post(
  "/:p2pCourseId/posts",
  verifyToken(["FREELANCER"]),
  p2pCourseController.addPost
);

/**
 * @openapi
 * /p2pCourses/:p2pCourseId/posts/:postId:
 *   put:
 *     summary: Update the a post in the p2p course
 *     tags:
 *       - P2PCourses
 */
p2pCourseRoutes.put(
  "/:p2pCourseId/posts/:postId",
  verifyToken(["FREELANCER"]),
  p2pCourseController.editPost
);

/**
 * @openapi
 * /p2pCourses/:p2pCourseId/posts/:postId:
 *   delete:
 *     summary: Deletes a post in the p2p course
 *     tags:
 *       - P2PCourses
 */
p2pCourseRoutes.delete(
  "/:p2pCourseId/posts/:postId",
  verifyToken(["FREELANCER"]),
  p2pCourseController.removePost
);

/**
 * @openapi
 * /p2pCourses/:p2pCourseId/sessions:
 *   post:
 *     summary: Create a new session in the p2p course
 *     tags:
 *       - P2PCourses
 */
p2pCourseRoutes.post(
  "/:p2pCourseId/sessions",
  verifyToken(["FREELANCER"]),
  p2pCourseController.addSession
);

/**
 * @openapi
 * /p2pCourses/:p2pCourseId/sessions/:sessionId:
 *   put:
 *     summary: Updates a session in the p2p course
 *     tags:
 *       - P2PCourses
 */
p2pCourseRoutes.put(
  "/:p2pCourseId/sessions/:sessionId",
  verifyToken(["FREELANCER"]),
  p2pCourseController.editSession
);

/**
 * @openapi
 * /p2pCourses/:p2pCourseId/sessions/:sessionId:
 *   delete:
 *     summary: Removes a session of the p2p course
 *     tags:
 *       - P2PCourses
 */
p2pCourseRoutes.delete(
  "/:p2pCourseId/sessions/:sessionId",
  verifyToken(["FREELANCER"]),
  p2pCourseController.removeSession
);

/**
 * @openapi
 * /p2pCourses/:p2pCourseId/sessions/:sessionId/status:
 *   patch:
 *     summary: Updates the status of a session to completed
 *     tags:
 *       - P2PCourses
 */
p2pCourseRoutes.patch(
  "/:p2pCourseId/sessions/:sessionId/complete",
  verifyToken(["FREELANCER"]),
  p2pCourseController.completeSession
);

/**
 * @openapi
 * /p2pCourses/:p2pCourseId/files:
 *   post:
 *     summary: Create a new filePost in the p2p course
 *     tags:
 *       - P2PCourses
 */
p2pCourseRoutes.post(
  "/:p2pCourseId/files",
  verifyToken(["FREELANCER"]),
  p2pCourseController.addFilePost
);

/**
 * @openapi
 * /p2pCourses/:p2pCourseId/files/fileId:
 *   delete:
 *     summary: Deletes a filePost in the p2p course
 *     tags:
 *       - P2PCourses
 */
p2pCourseRoutes.delete(
  "/:p2pCourseId/files/:filePostId",
  verifyToken(["FREELANCER"]),
  p2pCourseController.removeFilePost
);

export default p2pCourseRoutes;
