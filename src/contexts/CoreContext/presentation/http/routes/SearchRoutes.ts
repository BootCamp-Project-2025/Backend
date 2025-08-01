import { ISearchController } from "@/contexts/CoreContext/domain/interfaces/controllers/ISearchController";
import { Router } from "express";
import { container } from "tsyringe";

const requestSearchController = container.resolve<ISearchController>(
  "RequestSearchController"
);
const courseSearchController = container.resolve<ISearchController>(
  "CourseSearchController"
);

export const router = Router();

router.get("/courses/search", courseSearchController.search);

router.get("/requests/search", requestSearchController.search);
