import { container } from "tsyringe";
import { Router } from "express";
import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";
import { IAuthController } from "@/contexts/CoreContext/domain/interfaces/controllers/IAuthController";

const controller = container.resolve<IAuthController>("IAuthController");
const router = Router();

/**
 * @openapi
 * /auth/sync:
 *   post:
 *     summary: Synchronize user information with Keycloak
 *     description: Synchronizes the authenticated user's information from Keycloak with the internal system.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: User information synchronized successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/sync", verifyToken(), controller.syncUser);

/**
 * @openapi
 * /auth/roles:
 *   put:
 *     summary: Update user roles
 *     description: Updates the roles of the authenticated user. Authentication required.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: The new role to assign to the user.
 *     responses:
 *       '200':
 *         description: User roles updated successfully
 *       '400':
 *         description: Bad request, role is required
 *       '401':
 *         description: Unauthorized, invalid token
 *       '500':
 *         description: Internal server error
 */
router.put("/roles", verifyToken(), controller.updateUserRoles);

export default router;
