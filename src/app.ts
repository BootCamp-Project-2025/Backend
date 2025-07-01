import express from "express";
import cors from "cors";
import "reflect-metadata";
import "./di-container";
import healthRoutes from "./contexts/SystemHealth/presentation/http/routes/healthRoutes";
import freelancersRoutes from "./contexts/CoreContext/presentation/http/routes/FreelancersRoutes";
import courseRoutes from "./contexts/LearningContext/presentation/http/routes/CourseRoutes";
import { ErrorHandlerMiddleware } from "./contexts/Shared/infrastructure/middlewares/ErrorHandlerMiddleware";
import userRoutes from "./contexts/CoreContext/presentation/http/routes/UserRoutes";
import certificationRoutes from "./contexts/CoreContext/presentation/http/routes/CertificationRoutes";
import authRoutes from "./contexts/CoreContext/presentation/http/routes/AuthRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);

app.use("/api/users", userRoutes);
app.use("/api/freelancers", freelancersRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/freelancer", certificationRoutes);

app.use("/api/auth", authRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(ErrorHandlerMiddleware.handle);

export default app;
