import "reflect-metadata";

import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import ILessonRepository from "@/contexts/LearningContext/domain/interfaces/ILessonRepository";
import LessonMapper from "@/contexts/LearningContext/mappers/LessonMapper";
import UpdateLessonUseCase from "@/contexts/LearningContext/application/useCases/lesson/UpdateLessonUseCase";

const mockRepository: jest.Mocked<ILessonRepository> = {
  update: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

const useCase = new UpdateLessonUseCase(mockRepository);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("UpdateLessonUseCase", () => {
  it("exist", () => {
    expect(useCase).toBeDefined;
  });
  it("edits correctly", () => {
    const lesson = LessonMapper.DtoToDomain({
      id: "testId",
      title: "Test Lesson",
      position: 1,
      description: "12345123451234512345123451234512345",
      videoUrls: [],
      resources: [],
    });
    const lessonOld = LessonMapper.DtoToDomain({
      id: "testId",
      title: "Test Lesson Old",
      position: 1,
      description: "12345123451234512345123451234512345",
      videoUrls: [],
      resources: [],
    });
    mockRepository.findById.mockResolvedValue(lessonOld);
    mockRepository.update.mockResolvedValue(lesson);
    expect(async () => await useCase.execute(lesson)).resolves;
  });

  it("Lesson not found", () => {
    const lesson = LessonMapper.DtoToDomain({
      id: "testId",
      title: "Test Lesson",
      position: 1,
      description: "12345123451234512345123451234512345",
      videoUrls: [],
      resources: [],
    });
    mockRepository.findById.mockResolvedValue(null);
    mockRepository.update.mockResolvedValue(lesson);
    expect(async () => await useCase.execute(lesson)).rejects.toThrow(ApiError);
  });
});
