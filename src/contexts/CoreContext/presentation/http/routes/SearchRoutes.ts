import { ISearchController } from "@/contexts/CoreContext/domain/interfaces/controllers/ISearchController";
import { Router } from "express";
import { container } from "tsyringe";

const controller = container.resolve<ISearchController>("ISearchController");
export const router = Router();

router.get("/search", controller.search);
