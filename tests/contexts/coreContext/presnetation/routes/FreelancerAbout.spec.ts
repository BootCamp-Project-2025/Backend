import { Request, Response } from "express";
import FreelancerController from "@/contexts/CoreContext/presentation/http/controllers/FreelancerController";
import FreelancerService from "@/contexts/CoreContext/application/services/FreelancerService";
import { User } from "@/contexts/CoreContext/domain/aggregates/User";

describe("FreelancerController", () => {
  let service: jest.Mocked<FreelancerService>;
  let controller: FreelancerController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    service = {
      getAbout: jest.fn(),
      updateAbout: jest.fn(),
    } as unknown as jest.Mocked<FreelancerService>;

    controller = new FreelancerController(service);

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getAbout", () => {
    it("should return 200 and about if found", async () => {
      req = { params: { id: "123" } };
      service.getAbout.mockResolvedValue("I am a full stack dev");

      await controller.getAbout(req as Request, res as Response);

      expect(service.getAbout).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ about: "I am a full stack dev" });
    });

    it("should return 404 if not found", async () => {
      req = { params: { id: "123" } };
      service.getAbout.mockRejectedValue(new Error("Not Found"));

      await controller.getAbout(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Freelancer not found",
      });
    });
  });

  describe("updateAbout", () => {
    it("should update about and return 200", async () => {
      req = {
        params: { id: "123" },
        body: { about: "Updated bio" },
      };

      service.updateAbout.mockResolvedValue(req as User);

      await controller.updateAbout(req as Request, res as Response);

      expect(service.updateAbout).toHaveBeenCalledWith("123", "Updated bio");
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should return 404 if not found", async () => {
      req = {
        params: { id: "123" },
        body: { about: "Some bio" },
      };

      service.updateAbout.mockRejectedValue(new Error("Not Found"));

      await controller.updateAbout(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Freelancer profile not found",
      });
    });
  });
});
