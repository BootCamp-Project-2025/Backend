import "reflect-metadata";
import GetP2PCoursesByUserIdUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/GetP2PCoursesByUserIdUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { P2PCourseDB } from "@/contexts/LearningContext/domain/dtos/Dbtypes";

describe("GetP2PCoursesByUserIdUseCase", () => {
    const p2pCourseRepositoryMock = {
        create: jest.fn(),
        findById: jest.fn(),
        findByUserIdAndCourseId: jest.fn(),
        findByUserId: jest.fn(),
        findByTeacherId: jest.fn(),
    };

    it("Creates correctly", () => {
        const useCase = new GetP2PCoursesByUserIdUseCase(p2pCourseRepositoryMock);
        expect(useCase).toBeInstanceOf(GetP2PCoursesByUserIdUseCase);
    });

    it("Throws error if there are no courses found", async () => {
        const useCase = new GetP2PCoursesByUserIdUseCase(p2pCourseRepositoryMock);
        p2pCourseRepositoryMock.findByUserId.mockResolvedValue([]);
        await expect(useCase.execute("userTestId")).rejects.toThrow(ApiError);
    });

    it("Returns courses if found", async () => {
        const courses: P2PCourseDB[] = [
            {
                id: "course1",
                name: "Course Name",
                status: "ACTIVE",
                remainingSession: 5,
                teacherId: "teacherid",
                chatId: "chatID",
                studentId: "stuendID",
                posts: [],
                files: [],
                sessions: [],
                teacherName: "Super name"
            },
        ];

        const useCase = new GetP2PCoursesByUserIdUseCase(p2pCourseRepositoryMock);
        p2pCourseRepositoryMock.findByUserId.mockResolvedValue(courses);

        await expect(useCase.execute("userTestId")).resolves.toEqual(courses);
    });
});
