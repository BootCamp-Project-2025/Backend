import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import StudentTrackProgressService from "@/contexts/LearningContext/application/services/StudentTrackProgressService";
import { StudentTrackProgress } from "@/contexts/LearningContext/domain/entities/StudentTrackProgress";
import { Lesson } from "@/contexts/LearningContext/domain/entities/Lesson";

const fakeTrackProgress = {
  lessonId: "lesson123",
  setAsCompleted: jest.fn(),
  isCompleted: jest.fn(),
} as unknown as StudentTrackProgress;
const fakeLesson = {
  props: { resources: [{ url: "a.pdf" }, { url: "b.png" }] },
} as Lesson;

const createUseCase = { execute: jest.fn() };
const deleteUseCase = { execute: jest.fn() };
const updateUseCase = { execute: jest.fn() };
const getByEnrollmentUseCase = { execute: jest.fn() };
const getByIdUseCase = { execute: jest.fn() };
const getLessonByIdUseCase = { execute: jest.fn() };

function makeService() {
  return new StudentTrackProgressService(
    createUseCase as any,
    deleteUseCase as any,
    updateUseCase as any,
    getByEnrollmentUseCase as any,
    getByIdUseCase as any,
    getLessonByIdUseCase as any
  );
}

describe("StudentTrackProgressService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should call createUseCase.execute with correct args", async () => {
      createUseCase.execute.mockResolvedValue(undefined);
      const service = makeService();

      await service.create(fakeTrackProgress, "enroll1");
      expect(createUseCase.execute).toHaveBeenCalledWith({
        trackProgress: fakeTrackProgress,
        enrollmentId: "enroll1",
      });
    });

    it("should throw ApiError on unknown error", async () => {
      createUseCase.execute.mockRejectedValue(new Error("fail"));
      const service = makeService();
      await expect(
        service.create(fakeTrackProgress, "enroll1")
      ).rejects.toThrow(ApiError);
    });
  });

  describe("delete", () => {
    it("should call deleteUseCase.execute with correct id", async () => {
      deleteUseCase.execute.mockResolvedValue(undefined);
      const service = makeService();

      await service.delete("id123");
      expect(deleteUseCase.execute).toHaveBeenCalledWith("id123");
    });
  });

  describe("update", () => {
    it("should call updateUseCase.execute and setAsCompleted", async () => {
      getLessonByIdUseCase.execute.mockResolvedValue(fakeLesson);
      updateUseCase.execute.mockResolvedValue(undefined);
      const service = makeService();

      await service.update(fakeTrackProgress);
      expect(getLessonByIdUseCase.execute).toHaveBeenCalledWith("lesson123");
      expect(fakeTrackProgress.setAsCompleted).toHaveBeenCalledWith(1);
      expect(updateUseCase.execute).toHaveBeenCalledWith(fakeTrackProgress);
    });

    it("should throw ApiError if lesson is not found", async () => {
      getLessonByIdUseCase.execute.mockResolvedValue(undefined);
      const service = makeService();
      await expect(service.update(fakeTrackProgress)).rejects.toThrow(ApiError);
    });
  });

  describe("getByEnrollment", () => {
    it("should return correct progress structure", async () => {
      const completed = { isCompleted: () => true } as any;
      const notCompleted = { isCompleted: () => false } as any;
      getByEnrollmentUseCase.execute.mockResolvedValue([
        completed,
        notCompleted,
      ]);
      const service = makeService();

      const result = await service.getByEnrollment("enroll1");
      expect(result).toEqual({
        progress: 0.5,
        studentTrackProgresses: [completed, notCompleted],
      });
    });
  });

  describe("getById", () => {
    it("should return trackProgress if found", async () => {
      getByIdUseCase.execute.mockResolvedValue(fakeTrackProgress);
      const service = makeService();

      const result = await service.getById("id123");
      expect(result).toBe(fakeTrackProgress);
    });

    it("should throw ApiError if not found", async () => {
      getByIdUseCase.execute.mockResolvedValue(null);
      const service = makeService();
      await expect(service.getById("id123")).rejects.toThrow(ApiError);
    });
  });
});
