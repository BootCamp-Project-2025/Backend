import "reflect-metadata";
import { EditCourseUseCase } from "@/contexts/LearningContext/application/useCases/EditCourseUseCase";

jest.mock("../../domain/interfaces/ICourseRepository");

describe("EditCourseUseCase", () => {
  it("exist", () => {
    expect(EditCourseUseCase).toBeDefined;
  });
});
