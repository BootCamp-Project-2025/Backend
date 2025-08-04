import "reflect-metadata";
import { DeleteCourseUseCase } from "../../../../../src/contexts/LearningContext/application/useCases/DeleteCourseUseCase";
import { ICourseRepository } from "../../../../../src/contexts/LearningContext/domain/interfaces/ICourseRepository";
import { globalEventDispatcher } from "@/eventRegister";
import { DeleteResourceEvent } from "@/contexts/Shared/domain/events/DeleteResourceEvent";

jest.mock("@/eventRegister", () => ({
  globalEventDispatcher: {
    dispatch: jest.fn(),
  },
}));

describe("DeleteCourseUseCase", () => {
  let repoMock: { delete: jest.Mock };
  let useCase: DeleteCourseUseCase;

  beforeEach(() => {
    repoMock = { delete: jest.fn() };

    useCase = new DeleteCourseUseCase(repoMock as unknown as ICourseRepository);
  });

  it("should call courseRepo.delete with the provided id and dispatch DeleteReourceEvent", async () => {
    const testId = "course-123";

    await expect(useCase.execute(testId)).resolves.toBeUndefined();

    expect(repoMock.delete).toHaveBeenCalledTimes(1);
    expect(repoMock.delete).toHaveBeenCalledWith(testId);

    expect(globalEventDispatcher.dispatch).toHaveBeenCalledTimes(1);
    const dispatchedEvent = (globalEventDispatcher.dispatch as jest.Mock).mock
      .calls[0][0];
    expect(dispatchedEvent).toBeInstanceOf(DeleteResourceEvent);
    expect(dispatchedEvent.payload.resource).toBe("course");
    expect(dispatchedEvent.payload.resourceId).toBe(testId);
  });
});
