import "reflect-metadata";
import { DeleteCourseUseCase } from "@/contexts/LearningContext/application/useCases/DeleteCourseUseCase";

describe("DeleteCourseUseCase", () => {
  it("exist", () => {
    expect(DeleteCourseUseCase).toBeDefined;
  });
});
