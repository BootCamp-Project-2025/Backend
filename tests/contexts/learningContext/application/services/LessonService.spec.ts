import "reflect-metadata";
import LessonService from "@/contexts/LearningContext/application/services/LessonService";
import LessonMapper from "@/contexts/LearningContext/mappers/LessonMapper";

const createLessonUseCase = {
  execute: jest.fn(),
};
const deleteLessonUseCase = {
  execute: jest.fn(),
};
const updateLessonUseCase = {
  execute: jest.fn(),
};

describe("LessonService", () => {
  const lessonService = new LessonService(
    createLessonUseCase,
    deleteLessonUseCase,
    updateLessonUseCase
  );

  it("should create a lesson", async () => {
    const lesson = LessonMapper.DtoToDomain({
      id: "1",
      title: "Test Lesson",
      position: 1,
      description: "",
      videoUrls: [],
      resources: [],
    });
    createLessonUseCase.execute.mockResolvedValue(lesson);
    const result = await lessonService.create(lesson, "moduleId");
    expect(createLessonUseCase.execute).toHaveBeenCalledWith({
      moduleId: "moduleId",
      lesson: lesson,
    });
    expect(result).toEqual(lesson);
  });

  it("should delete a lesson", async () => {
    await lessonService.delete("lessonId");
    expect(deleteLessonUseCase.execute).toHaveBeenCalledWith("lessonId");
  });

  it("should update a lesson", async () => {
    const lesson = LessonMapper.DtoToDomain({
      id: "1",
      title: "Test Lesson",
      position: 1,
      description: "",
      videoUrls: [],
      resources: [],
    });
    updateLessonUseCase.execute.mockResolvedValue(lesson);
    const result = await lessonService.update(lesson);
    expect(updateLessonUseCase.execute).toHaveBeenCalledWith(lesson);
    expect(result).toEqual(lesson);
  });
});
