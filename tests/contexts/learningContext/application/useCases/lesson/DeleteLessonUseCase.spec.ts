import "reflect-metadata";

import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import ILessonRepository from "@/contexts/LearningContext/domain/interfaces/ILessonRepository";
import LessonMapper from "@/contexts/LearningContext/mappers/LessonMapper";
import DeleteLessonUseCase from "@/contexts/LearningContext/application/useCases/lesson/DeleteLessonUseCase";

const mockRepository: jest.Mocked<ILessonRepository> = {
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
};

const useCase = new DeleteLessonUseCase(mockRepository);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("DeleteLessonUseCase", () => {
  it("exist", () => {
    expect(useCase).toBeDefined();
  });
  it("deletes correctly", () => {
    const lesson = LessonMapper.DtoToDomain({
      id: "testId",
      title: "Test Lesson",
      position: 1,
      description: "12345123451234512345123451234512345",
      videoUrls: [],
      resources: [],
    });
    mockRepository.findById.mockResolvedValue(lesson);
    mockRepository.delete.mockResolvedValue();
    expect(useCase.execute("testLessonId")).resolves.toBe(undefined);
  });

  it("Lesson not found", () => {
    mockRepository.findById.mockResolvedValue(null);
    mockRepository.delete.mockResolvedValue();
    expect(async () => await useCase.execute("testLessonId")).rejects.toThrow(
      ApiError
    );
  });
});
