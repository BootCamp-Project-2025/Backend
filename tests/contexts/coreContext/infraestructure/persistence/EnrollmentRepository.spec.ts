import "reflect-metadata";
import { EnrollmentRepository } from "@/contexts/CoreContext/infrastructure/persistence/EnrollmentRepository";
import { EnrollmentMapper } from "@/contexts/CoreContext/mappers/EnrollmentMapper";
import { EnrollmentStatus } from "@/generated/prisma";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";

jest.mock("@/contexts/Shared/infrastructure/database/PrismaClient", () => ({
  __esModule: true,
  default: {
    enrollment: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

const prismaMock = PrismaClient.enrollment as unknown as {
  create: jest.Mock;
  update: jest.Mock;
  findUnique: jest.Mock;
  findFirst: jest.Mock;
};
const mockEnrollmentDTO = {
  id: "enroll-1",
  userId: "user-1",
  courseId: "course-1",
  createdAt: new Date(),
  status: EnrollmentStatus.ENROLLED,
};

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
      prismaMock.create.mockResolvedValue(mockEnrollmentDTO);

      const result = await repository.create(domainEnrollment);

      expect(prismaMock.create).toHaveBeenCalledWith({
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
      prismaMock.update.mockResolvedValue(undefined);

      await repository.cancelEnrollment(domainEnrollment);

      expect(prismaMock.update).toHaveBeenCalledWith({
        where: { id: mockEnrollmentDTO.id },
        data: { status: mockEnrollmentDTO.status },
      });
    });
  });

  describe("findById", () => {
    it("should return the enrollment if found", async () => {
      prismaMock.findUnique.mockResolvedValue(mockEnrollmentDTO);

      const result = await repository.findById(mockEnrollmentDTO.id);

      expect(prismaMock.findUnique).toHaveBeenCalledWith({
        where: { id: mockEnrollmentDTO.id },
      });
      expect(result).toEqual(domainEnrollment);
    });

    it("should throw ApiError if enrollment not found", async () => {
      prismaMock.findUnique.mockResolvedValue(null);

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
      prismaMock.findFirst.mockResolvedValue(mockEnrollmentDTO);

      const result = await repository.isUserEnrolled(
        mockEnrollmentDTO.userId,
        mockEnrollmentDTO.courseId
      );

      expect(prismaMock.findFirst).toHaveBeenCalledWith({
        where: {
          userId: mockEnrollmentDTO.userId,
          courseId: mockEnrollmentDTO.courseId,
        },
      });
      expect(result).toBe(true);
    });

    it("should return false if enrollment does not exist", async () => {
      prismaMock.findFirst.mockResolvedValue(null);

      const result = await repository.isUserEnrolled(
        mockEnrollmentDTO.userId,
        mockEnrollmentDTO.courseId
      );

      expect(result).toBe(false);
    });
  });

  describe("getByUserId", () => {
    it("should return a list of enrollments for the given user", async () => {
      const mockEnrollments = [
        mockEnrollmentDTO,
        { ...mockEnrollmentDTO, id: "enroll-2" },
      ];
      const expected = mockEnrollments.map(
        EnrollmentMapper.persistanceToDomain
      );

      (PrismaClient.enrollment.findMany as jest.Mock).mockResolvedValue(
        mockEnrollments
      );

      const result = await repository.getByUserId(mockEnrollmentDTO.userId);

      expect(PrismaClient.enrollment.findMany).toHaveBeenCalledWith({
        where: { userId: mockEnrollmentDTO.userId },
        orderBy: { createdAt: "desc" },
      });

      expect(result).toEqual(expected);
    });

    it("should throw ApiError if Prisma throws", async () => {
      (PrismaClient.enrollment.findMany as jest.Mock).mockRejectedValue(
        new Error("DB error")
      );

      await expect(repository.getByUserId("user-1")).rejects.toThrow(ApiError);
      await expect(repository.getByUserId("user-1")).rejects.toMatchObject({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error fetching enrollments.",
      });
    });
  });
});
