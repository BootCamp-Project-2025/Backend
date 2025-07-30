import "reflect-metadata";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import GetStudentTrackProgressByEnrollmentUseCase from "@/contexts/LearningContext/application/useCases/studentTrackProgress/GetStudentTrackProgressByEnrollmentUseCase";
import { StudentTrackProgress } from "@/contexts/LearningContext/domain/entities/StudentTrackProgress";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { IStudentTrackProgressRepository } from "@/contexts/LearningContext/domain/interfaces/IStudentTrackProgressRepository";
import { EnrollmentId } from "@/contexts/CoreContext/domain/valueObjects/EnrollmentId";

const mockRepository = {
  findById: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  findByEnrollment: jest.fn(),
};

function makeUseCase() {
  return new GetStudentTrackProgressByEnrollmentUseCase(
    mockRepository as IStudentTrackProgressRepository
  );
}

const fakeEnrollmentId = { toString: () => "enroll1" } as EnrollmentId;

const fakeProps = {
  enrollmentId: fakeEnrollmentId,
  lessonId: "lesson1",
  videoProgresses: [],
  resourcesCompleted: [],
  completed: false,
  completedAt: undefined,
};

const fakeTrack1 = StudentTrackProgress.create(
  fakeProps,
  new UniqueEntityID("track1")
);
const fakeTrack2 = StudentTrackProgress.create(
  { ...fakeProps, lessonId: "lesson2" },
  new UniqueEntityID("track2")
);
const fakeResults = [fakeTrack1, fakeTrack2];

describe("GetStudentTrackProgressByEnrollmentUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe devolver la lista de StudentTrackProgress si encuentra resultados", async () => {
    mockRepository.findByEnrollment.mockResolvedValue(fakeResults);

    const useCase = makeUseCase();
    const result = await useCase.execute({ enrollmentId: "enroll1" });
    expect(result).toBe(fakeResults);
    expect(mockRepository.findByEnrollment).toHaveBeenCalledWith("enroll1");
  });

  it("debe lanzar ApiError 404 si no encuentra resultados", async () => {
    mockRepository.findByEnrollment.mockResolvedValue([]);

    const useCase = makeUseCase();
    await expect(useCase.execute({ enrollmentId: "enroll1" })).rejects.toThrow(
      ApiError
    );
    expect(mockRepository.findByEnrollment).toHaveBeenCalledWith("enroll1");
  });
});
