import "reflect-metadata";
import GetP2PCoursesByTeacherIdUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/GetP2PCoursesByTeacherIdUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { P2PCourseByTeacherDB } from "@/contexts/LearningContext/domain/dtos/Dbtypes";

describe("GetP2PCoursesByTeacherIdUseCase", () => {
    const p2pCourseRepositoryMock = {
        create: jest.fn(),
        findById: jest.fn(),
        findByUserIdAndCourseId: jest.fn(),
        findByUserId: jest.fn(),
        findByTeacherId: jest.fn(),
    };

    it("Creates correctly", () => {
        const useCase = new GetP2PCoursesByTeacherIdUseCase(p2pCourseRepositoryMock);
        expect(useCase).toBeInstanceOf(GetP2PCoursesByTeacherIdUseCase);
    });

    it("Throws error if there are no courses found", async () => {
        const useCase = new GetP2PCoursesByTeacherIdUseCase(p2pCourseRepositoryMock);
        p2pCourseRepositoryMock.findByTeacherId.mockResolvedValue([]);
        await expect(useCase.execute("teacherTestId")).rejects.toThrow(ApiError);
    });

    it("Returns courses if found", async () => {
        const courses: P2PCourseByTeacherDB[] = [
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
                studentName: "Super name"
            },
        ];

        const useCase = new GetP2PCoursesByTeacherIdUseCase(p2pCourseRepositoryMock);
        p2pCourseRepositoryMock.findByTeacherId.mockResolvedValue(courses);

        await expect(useCase.execute("teacherTestId")).resolves.toEqual(courses);
    });
});
