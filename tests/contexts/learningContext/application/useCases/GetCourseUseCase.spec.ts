import "reflect-metadata";
import { GetCourseUseCase } from "@/contexts/LearningContext/application/useCases/GetCourseUseCase";

describe("GetCourseUseCase", () => {
  it("exist", () => {
    expect(GetCourseUseCase).toBeDefined;
  });
});
