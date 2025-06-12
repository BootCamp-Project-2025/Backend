import express from "express";
import cors from "cors";
import "reflect-metadata";
import "./di-container";
import healthRoutes from "./contexts/SystemHealth/presentation/http/routes/healthRoutes";
import courseRoutes from "./contexts/LearningContext/presentation/http/routes/CourseRoutes";
import { ErrorHandlerMiddleware } from "./contexts/Shared/infrastructure/middlewares/ErrorHandlerMiddleware";

import courseRouter from "./contexts/LearningContext/presentation/http/routes/CourseRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/courses", courseRouter);

app.use("/api/courses", courseRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Global error handler
app.use(ErrorHandlerMiddleware.handle);

export default app;
