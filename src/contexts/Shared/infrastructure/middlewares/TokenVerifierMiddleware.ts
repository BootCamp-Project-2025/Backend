/**
 * Middleware function to verify JWT tokens and enforce role-based access control.
 *
 * This middleware extracts the JWT token from the `Authorization` header, verifies it using the JWKS endpoint
 * from Keycloak, and checks if the user has the required roles. If the token is invalid or the user lacks
 * the necessary roles, it responds with an appropriate HTTP error.
 *
 * @param requiredRoles - An array of roles required to access the route. If empty, no role check is performed.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 *
 * @throws {ApiError} - Throws an ApiError with status 401 if the token is missing or invalid,
 *                      or with status 403 if the user lacks required roles.
 *
 * @remarks
 * Utiliza Keycloak como proveedor de identidad y JWKS para la verificación de firmas.
 * Añade el campo `user_id` al objeto `req` si la verificación es exitosa.
 */
import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import "express";
import { ErrorResponseEntity } from "../../domain/entity/ErrorResponseEntity";
import { ResponseService } from "../../application/services/ResponseService";
import dotenv from "dotenv";
dotenv.config();

declare module "express" {
  interface Request {
    user?: {
      id?: string;
      email?: string;
      name?: string;
    };
    roles?: string[];
  }
}

export function verifyToken(requiredRoles: string[] = []): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      const error = new ErrorResponseEntity(
        StatusCodes.UNAUTHORIZED,
        "Token is required"
      );
      ResponseService.send(res, error);
      return;
    }
    console.log(`${process.env.KEYCLOAK_URL}, ${process.env.KEYCLOAK_REALM}`);
    jwt.verify(
      token,
      getKey,
      {
        algorithms: ["RS256"],
        issuer: `${process.env.KEYCLOAK_URL}realms/${process.env.KEYCLOAK_REALM}`,
      },
      (err, decoded) => {
        if (err) {
          const error = new ErrorResponseEntity(
            StatusCodes.UNAUTHORIZED,
            "Invalid token"
          );
          ResponseService.send(res, error);
          return;
        }

        if (requiredRoles.length > 0) {
          let userRoles: string[] = [];

          if (typeof decoded !== "string" && decoded?.realm_access?.roles) {
            userRoles = decoded.realm_access.roles;
            req.roles = userRoles;
          }

          const hasRequiredRole = requiredRoles.some((role) =>
            userRoles.includes(role)
          );

          if (!hasRequiredRole) {
            const error = new ErrorResponseEntity(
              StatusCodes.FORBIDDEN,
              "You do not have permission to access this resource"
            );
            ResponseService.send(res, error);
            return;
          }
        }

        if (typeof decoded !== "string") {
          const user = {
            id: decoded?.sub,
            email: decoded?.email,
            name: decoded?.name,
          };

          req.user = user;
        }
        next();
      }
    );
  };
}
const certURI = `${process.env.KEYCLOAK_URL}realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`;
console.log(certURI);
const client = jwksClient({
  jwksUri: certURI,
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) return callback(err);

    if (!key) return callback(new Error("Signing key not found"));

    const signingKey = key.getPublicKey();
    console.log(signingKey);
    callback(null, signingKey);
  });
  return;
}
