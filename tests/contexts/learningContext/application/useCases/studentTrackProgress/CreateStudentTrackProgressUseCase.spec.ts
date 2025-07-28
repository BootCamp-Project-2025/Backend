import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import CreateStudentTrackProgressUseCase from "@/contexts/LearningContext/application/useCases/studentTrackProgress/CreateStudentTrackProgressUseCase";
import { StudentTrackProgress } from "@/contexts/LearningContext/domain/entities/StudentTrackProgress";

const mockTrackRepository = { create: jest.fn() };
const mockEnrollmentRepository = { findById: jest.fn() };
const fakeTrackProgress = {} as StudentTrackProgress;
const fakeEnrollment = { id: "enroll1" };

function makeUseCase() {
    return new CreateStudentTrackProgressUseCase(
        mockTrackRepository as any,
        mockEnrollmentRepository as any
    );
}

describe("CreateStudentTrackProgressUseCase", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("crea el progreso si encuentra el enrollment", async () => {
        mockEnrollmentRepository.findById.mockResolvedValue(fakeEnrollment);
        mockTrackRepository.create.mockResolvedValue(undefined);

        const useCase = makeUseCase();
        await expect(
            useCase.execute({ trackProgress: fakeTrackProgress, enrollmentId: "enroll1" })
        ).resolves.toBeUndefined();

        expect(mockEnrollmentRepository.findById).toHaveBeenCalledWith("enroll1");
        expect(mockTrackRepository.create).toHaveBeenCalledWith(fakeTrackProgress);
    });

    it("lanza ApiError si no existe el enrollment", async () => {
        mockEnrollmentRepository.findById.mockResolvedValue(undefined);
        const useCase = makeUseCase();

        await expect(
            useCase.execute({ trackProgress: fakeTrackProgress, enrollmentId: "enroll1" })
        ).rejects.toThrow(ApiError);

        expect(mockTrackRepository.create).not.toHaveBeenCalled();
    });

    it("propaga ApiError si ocurre dentro del try", async () => {
        mockEnrollmentRepository.findById.mockImplementation(() => {
            throw new ApiError(StatusCodes.BAD_REQUEST, "bad");
        });
        const useCase = makeUseCase();

        await expect(
            useCase.execute({ trackProgress: fakeTrackProgress, enrollmentId: "enroll1" })
        ).rejects.toThrow(ApiError);
    });

    it("lanza ApiError 500 si ocurre error desconocido", async () => {
        mockEnrollmentRepository.findById.mockRejectedValue(new Error("fail"));
        const useCase = makeUseCase();

        await expect(
            useCase.execute({ trackProgress: fakeTrackProgress, enrollmentId: "enroll1" })
        ).rejects.toThrow(ApiError);
    });
});
