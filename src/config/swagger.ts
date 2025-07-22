import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

const API_HOST = process.env.API_HOST || "localhost";
const API_PORT = process.env.API_PORT || 3000;

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "LTCrowd API",
      version: "0.0.1",
      description: "API for LTCrowd app",
    },
    tags: [
      {
        name: "User",
      },
      {
        name: "Client",
      },
      {
        name: "Freelancer",
      },
    ],
    servers: [
      {
        url: `http://${API_HOST}:${API_PORT}/api`,
      },
    ],
  },
  apis: ["src/contexts/*/presentation/http/routes/*.ts"],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
