// reflect-metadata debe ir primero para tsyringe
import "reflect-metadata";
import "@/di-container.ts";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger";
import certificationRoutes from "./contexts/CoreContext/presentation/http/routes/CertificationRoutes";
import userRoutes from "./contexts/CoreContext/presentation/http/routes/UserRoutes";
import { ErrorHandlerMiddleware } from "./contexts/Shared/infrastructure/middlewares/ErrorHandlerMiddleware";
import healthRoutes from "./contexts/SystemHealth/presentation/http/routes/healthRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);

//app.use("/api/courses", courseRoutes);

app.use("/api/users", userRoutes);

app.use("/api/freelancer", certificationRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Global error handler
app.use(ErrorHandlerMiddleware.handle);

export default app;
