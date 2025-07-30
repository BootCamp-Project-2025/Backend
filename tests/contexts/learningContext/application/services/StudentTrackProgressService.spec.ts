import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import StudentTrackProgressService from "@/contexts/LearningContext/application/services/StudentTrackProgressService";
import { StudentTrackProgress } from "@/contexts/LearningContext/domain/entities/StudentTrackProgress";
import { Lesson } from "@/contexts/LearningContext/domain/entities/Lesson";
import { Enrollment } from "@/contexts/CoreContext/domain/aggregates/Enrollment";
import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import { Course } from "@/contexts/LearningContext/domain/aggregates/Course";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";

const fakeTrackProgress = {
  lessonId: "lesson123",
  setAsCompleted: jest.fn(),
  isCompleted: jest.fn(),
} as unknown as StudentTrackProgress;

const fakeLesson = {
  props: { resources: [{ url: "a.pdf" }, { url: "b.png" }] },
} as Lesson;

const fakeEnrollment = {
  props: { courseId: { toString: () => "course123" } },
} as unknown as Enrollment;

const fakeModule = {
  id: { toString: () => "module123" },
  props: {
    title: { props: { title: "Test Module" } },
    lessons: { currentItems: [] },
  },
} as unknown as Module;

const fakeCourse = {
  getName: () => ({ value: "Test Course" }),
} as unknown as Course;

const createUseCase: IUseCase<
  { trackProgress: StudentTrackProgress; enrollmentId: string },
  void
> = {
  execute: jest.fn(),
};
const updateUseCase: IUseCase<StudentTrackProgress, void> = {
  execute: jest.fn(),
};
const getByEnrollmentUseCase: IUseCase<
  { enrollmentId: string },
  StudentTrackProgress[]
> = {
  execute: jest.fn(),
};
const getByIdUseCase: IUseCase<string, StudentTrackProgress | null> = {
  execute: jest.fn(),
};
const getLessonByIdUseCase: IUseCase<string, Lesson> = {
  execute: jest.fn(),
};
const getEnrollmentByIdUseCase: IUseCase<string, Enrollment> = {
  execute: jest.fn(),
};
const getAllModulesUseCase: IUseCase<string, Module[]> = {
  execute: jest.fn(),
};
const getCourseUseCase: IUseCase<string, Course> = {
  execute: jest.fn(),
};

function makeService() {
  return new StudentTrackProgressService(
    createUseCase,
    updateUseCase,
    getByEnrollmentUseCase,
    getByIdUseCase,
    getLessonByIdUseCase,
    getEnrollmentByIdUseCase,
    getAllModulesUseCase,
    getCourseUseCase
  );
}

describe("StudentTrackProgressService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should call createUseCase.execute with correct args", async () => {
      (createUseCase.execute as jest.Mock).mockResolvedValue(undefined);
      const service = makeService();

      await service.create(fakeTrackProgress, "enroll1");
      expect(createUseCase.execute).toHaveBeenCalledWith({
        trackProgress: fakeTrackProgress,
        enrollmentId: "enroll1",
      });
    });

    it("should throw ApiError on unknown error", async () => {
      (createUseCase.execute as jest.Mock).mockRejectedValue(new Error("fail"));
      const service = makeService();
      await expect(
        service.create(fakeTrackProgress, "enroll1")
      ).rejects.toThrow(ApiError);
    });
  });

  describe("update", () => {
    it("should call updateUseCase.execute and setAsCompleted", async () => {
      (getLessonByIdUseCase.execute as jest.Mock).mockResolvedValue(fakeLesson);
      (updateUseCase.execute as jest.Mock).mockResolvedValue(undefined);
      const service = makeService();

      await service.update(fakeTrackProgress);
      expect(getLessonByIdUseCase.execute).toHaveBeenCalledWith("lesson123");
      expect(fakeTrackProgress.setAsCompleted).toHaveBeenCalledWith(1);
      expect(updateUseCase.execute).toHaveBeenCalledWith(fakeTrackProgress);
    });

    it("should throw ApiError if lesson is not found", async () => {
      (getLessonByIdUseCase.execute as jest.Mock).mockResolvedValue(null);
      const service = makeService();
      await expect(service.update(fakeTrackProgress)).rejects.toThrow(ApiError);
    });

    it("should throw ApiError on unknown error", async () => {
      (getLessonByIdUseCase.execute as jest.Mock).mockResolvedValue(fakeLesson);
      (updateUseCase.execute as jest.Mock).mockRejectedValue(new Error("fail"));
      const service = makeService();
      await expect(service.update(fakeTrackProgress)).rejects.toThrow(ApiError);
    });
  });

  describe("getByEnrollment", () => {
    it("should return correct progress structure", async () => {
      const completed = {
        isCompleted: () => true,
      } as unknown as StudentTrackProgress;
      const notCompleted = {
        isCompleted: () => false,
      } as unknown as StudentTrackProgress;

      (getByEnrollmentUseCase.execute as jest.Mock).mockResolvedValue([
        completed,
        notCompleted,
      ]);
      (getEnrollmentByIdUseCase.execute as jest.Mock).mockResolvedValue(
        fakeEnrollment
      );
      (getAllModulesUseCase.execute as jest.Mock).mockResolvedValue([
        fakeModule,
      ]);
      (getCourseUseCase.execute as jest.Mock).mockResolvedValue(fakeCourse);

      const service = makeService();
      const result = await service.getByEnrollment("enroll1");

      expect(result).toEqual({
        progress: 0.5,
        courseName: "Test Course",
        modules: [fakeModule],
        courseId: "course123",
        studentTrackProgresses: [completed, notCompleted],
      });
    });

    it("should return 0 progress when no progresses", async () => {
      (getByEnrollmentUseCase.execute as jest.Mock).mockResolvedValue([]);
      (getEnrollmentByIdUseCase.execute as jest.Mock).mockResolvedValue(
        fakeEnrollment
      );
      (getAllModulesUseCase.execute as jest.Mock).mockResolvedValue([
        fakeModule,
      ]);
      (getCourseUseCase.execute as jest.Mock).mockResolvedValue(fakeCourse);

      const service = makeService();
      const result = await service.getByEnrollment("enroll1");

      expect(result.progress).toBe(0);
    });

    it("should throw ApiError on unknown error", async () => {
      (getByEnrollmentUseCase.execute as jest.Mock).mockRejectedValue(
        new Error("fail")
      );
      const service = makeService();
      await expect(service.getByEnrollment("enroll1")).rejects.toThrow(
        ApiError
      );
    });
  });

  describe("getById", () => {
    it("should return trackProgress if found", async () => {
      (getByIdUseCase.execute as jest.Mock).mockResolvedValue(
        fakeTrackProgress
      );
      const service = makeService();

      const result = await service.getById("id123");
      expect(result).toBe(fakeTrackProgress);
    });

    it("should throw ApiError if not found", async () => {
      (getByIdUseCase.execute as jest.Mock).mockResolvedValue(null);
      const service = makeService();
      await expect(service.getById("id123")).rejects.toThrow(ApiError);
    });

    it("should throw ApiError on unknown error", async () => {
      (getByIdUseCase.execute as jest.Mock).mockRejectedValue(
        new Error("fail")
      );
      const service = makeService();
      await expect(service.getById("id123")).rejects.toThrow(ApiError);
    });
  });
});
