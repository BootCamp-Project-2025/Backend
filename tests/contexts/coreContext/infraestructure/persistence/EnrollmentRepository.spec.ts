import "reflect-metadata";
import { EnrollmentRepository } from "@/contexts/CoreContext/infrastructure/persistence/EnrollmentRepository";
import { EnrollmentMapper } from "@/contexts/CoreContext/mappers/EnrollmentMapper";
import { EnrollmentStatus } from "@/generated/prisma";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

jest.mock("@/contexts/Shared/infrastructure/database/PrismaClient", () => ({
  __esModule: true,
  default: {
    enrollment: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}));

const PrismaClient =
  require("@/contexts/Shared/infrastructure/database/PrismaClient").default;
const prismaMock = PrismaClient as {
  enrollment: {
    create: jest.Mock;
    update: jest.Mock;
    findUnique: jest.Mock;
    findFirst: jest.Mock;
  };
};

const mockEnrollmentDTO = {
  id: "enroll-1",
  userId: "user-1",
  courseId: "course-1",
  createdAt: new Date(),
  status: EnrollmentStatus.ENROLLED,
};

// Se genera el objeto de dominio real a partir del mapper
const domainEnrollment =
  EnrollmentMapper.persistanceToDomain(mockEnrollmentDTO);

describe("EnrollmentRepository (with real EnrollmentMapper)", () => {
  let repository: EnrollmentRepository;

  beforeEach(() => {
    repository = new EnrollmentRepository();
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create an enrollment and return the domain object", async () => {
      prismaMock.enrollment.create.mockResolvedValue(mockEnrollmentDTO);

      const result = await repository.create(domainEnrollment);

      expect(prismaMock.enrollment.create).toHaveBeenCalledWith({
        data: {
          userId: mockEnrollmentDTO.userId,
          courseId: mockEnrollmentDTO.courseId,
          createdAt: mockEnrollmentDTO.createdAt,
          status: mockEnrollmentDTO.status,
        },
      });
      expect(result).toEqual(domainEnrollment);
    });
  });

  describe("cancelEnrollment", () => {
    it("should update the enrollment status", async () => {
      prismaMock.enrollment.update.mockResolvedValue(undefined as any);

      await repository.cancelEnrollment(domainEnrollment);

      expect(prismaMock.enrollment.update).toHaveBeenCalledWith({
        where: { id: mockEnrollmentDTO.id },
        data: { status: mockEnrollmentDTO.status },
      });
    });
  });

  describe("findById", () => {
    it("should return the enrollment if found", async () => {
      prismaMock.enrollment.findUnique.mockResolvedValue(mockEnrollmentDTO);

      const result = await repository.findById(mockEnrollmentDTO.id);

      expect(prismaMock.enrollment.findUnique).toHaveBeenCalledWith({
        where: { id: mockEnrollmentDTO.id },
      });
      expect(result).toEqual(domainEnrollment);
    });

    it("should throw ApiError if enrollment not found", async () => {
      prismaMock.enrollment.findUnique.mockResolvedValue(null);

      await expect(repository.findById(mockEnrollmentDTO.id)).rejects.toThrow(
        ApiError
      );
      await expect(
        repository.findById(mockEnrollmentDTO.id)
      ).rejects.toMatchObject({
        statusCode: StatusCodes.NOT_FOUND,
        message: "Enrollment not found",
      });
    });
  });

  describe("isUserEnrolled", () => {
    it("should return true if enrollment exists", async () => {
      prismaMock.enrollment.findFirst.mockResolvedValue(mockEnrollmentDTO);

      const result = await repository.isUserEnrolled(
        mockEnrollmentDTO.userId,
        mockEnrollmentDTO.courseId
      );

      expect(prismaMock.enrollment.findFirst).toHaveBeenCalledWith({
        where: {
          userId: mockEnrollmentDTO.userId,
          courseId: mockEnrollmentDTO.courseId,
        },
      });
      expect(result).toBe(true);
    });

    it("should return false if enrollment does not exist", async () => {
      prismaMock.enrollment.findFirst.mockResolvedValue(null);

      const result = await repository.isUserEnrolled(
        mockEnrollmentDTO.userId,
        mockEnrollmentDTO.courseId
      );

      expect(result).toBe(false);
    });
  });
});
