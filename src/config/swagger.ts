import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";

const API_PORT = process.env.API_PORT ?? 3000;
const API_HOST = process.env.API_HOST ?? "localhost";

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "LTCrowd API",
      version: "0.0.1",
      description: "API for LTCrowd app",
    },
    servers: [
      {
        url: `http://40.77.20.173:3000:${API_PORT}/api`,
      },
    ],
  },
  apis: ["src/contexts/*/presentation/http/routes/*.ts"],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
