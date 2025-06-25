import "reflect-metadata";
import { EditCourseUseCase } from "@/contexts/LearningContext/application/useCases/EditCourseUseCase";

describe("EditCourseUseCase", () => {
  it("exist", () => {
    expect(EditCourseUseCase).toBeDefined;
  });
});
