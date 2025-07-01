import { IUserController } from "@/contexts/CoreContext/domain/interfaces/controllers/IUserController";
import { container } from "tsyringe";
import { Router } from "express";
import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";
const controller = container.resolve<IUserController>("IUserController");

const router = Router();
/**
 *  @openapi
 *  /auth/sync:
 *    post:
 *      summary: Syncronize user information with Keycloak
 *      description: Synchronizes the authenticated user's information from Keycloak with the internal system. Authentication
 *      tags:
 *        - Auth
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '201':
 *          description: User information synchronized successfully
 *        '400':
 *          description: Bad request
 *        '500':
 *          description: Internal server error
 */
router.post("/sync", verifyToken(), controller.syncUser);

export default router;
