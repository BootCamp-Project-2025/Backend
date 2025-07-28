import "reflect-metadata"
import { StudentTrackProgressRepository } from "@/contexts/LearningContext/infrastructure/database/StudentTrackProgresRepository";
import { StudentTrackProgressMapper } from "@/contexts/LearningContext/mappers/StudentTrackProgressMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

jest.mock("@/contexts/Shared/infrastructure/database/PrismaClient", () => ({
    studentTrackProgress: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}));
jest.mock("@/contexts/LearningContext/mappers/StudentTrackProgressMapper");

const prismaMock = require("@/contexts/Shared/infrastructure/database/PrismaClient");

describe("StudentTrackProgressRepository", () => {
    let repo: StudentTrackProgressRepository;
    const fakeDomainObj = { id: "1", foo: "bar" };
    const fakeDbObj = { id: "1", foo: "bar", videoProgresses: [], resourcesCompleted: [] };

    beforeEach(() => {
        jest.clearAllMocks();
        repo = new StudentTrackProgressRepository();
    });

    describe("findById", () => {
        it("should return mapped domain object if found", async () => {
            prismaMock.studentTrackProgress.findUnique.mockResolvedValue(fakeDbObj);
            (StudentTrackProgressMapper.PersistenceToDomain as jest.Mock).mockReturnValue(fakeDomainObj);

            const result = await repo.findById("1");
            expect(prismaMock.studentTrackProgress.findUnique).toHaveBeenCalledWith({
                where: { id: "1" },
                include: { videoProgresses: true, resourcesCompleted: true },
            });
            expect(result).toBe(fakeDomainObj);
        });

        it("should return null if not found", async () => {
            prismaMock.studentTrackProgress.findUnique.mockResolvedValue(null);

            const result = await repo.findById("2");
            expect(result).toBeNull();
        });

        it("should throw ApiError if unknown error occurs", async () => {
            prismaMock.studentTrackProgress.findUnique.mockRejectedValue(new Error("fail"));

            await expect(repo.findById("x")).rejects.toThrow(ApiError);
        });
    });

    describe("findByEnrollment", () => {
        it("should return mapped array", async () => {
            prismaMock.studentTrackProgress.findMany.mockResolvedValue([fakeDbObj]);
            (StudentTrackProgressMapper.PersistenceToDomain as jest.Mock).mockReturnValue(fakeDomainObj);

            const result = await repo.findByEnrollment("enroll-1");
            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBe(fakeDomainObj);
        });

        it("should return empty array if none found", async () => {
            prismaMock.studentTrackProgress.findMany.mockResolvedValue([]);
            const result = await repo.findByEnrollment("enroll-x");
            expect(result).toEqual([]);
        });

        it("should throw ApiError on error", async () => {
            prismaMock.studentTrackProgress.findMany.mockRejectedValue(new Error("fail"));
            await expect(repo.findByEnrollment("x")).rejects.toThrow(ApiError);
        });
    });

    describe("create", () => {
        it("should call prisma.create with mapped data", async () => {
            (StudentTrackProgressMapper.DomainToPersistence as jest.Mock).mockReturnValue(fakeDbObj);

            await repo.create(fakeDomainObj as any);

            expect(prismaMock.studentTrackProgress.create).toHaveBeenCalledWith({
                data: {
                    ...fakeDbObj,
                    videoProgresses: { create: fakeDbObj.videoProgresses },
                    resourcesCompleted: { create: fakeDbObj.resourcesCompleted },
                },
            });
        });

        it("should throw ApiError on error", async () => {
            prismaMock.studentTrackProgress.create.mockRejectedValue(new Error("fail"));
            (StudentTrackProgressMapper.DomainToPersistence as jest.Mock).mockReturnValue(fakeDbObj);

            await expect(repo.create(fakeDomainObj as any)).rejects.toThrow(ApiError);
        });
    });

    describe("update", () => {
        it("should call prisma.update with mapped data", async () => {
            (StudentTrackProgressMapper.DomainToPersistence as jest.Mock).mockReturnValue(fakeDbObj);

            await repo.update(fakeDomainObj as any);

            expect(prismaMock.studentTrackProgress.update).toHaveBeenCalledWith({
                where: { id: fakeDbObj.id },
                data: {
                    ...fakeDbObj,
                    videoProgresses: { deleteMany: {}, create: fakeDbObj.videoProgresses },
                    resourcesCompleted: { deleteMany: {}, create: fakeDbObj.resourcesCompleted },
                },
            });
        });
    });

    describe("delete", () => {
        it("should call prisma.delete with id", async () => {
            await repo.delete("some-id");
            expect(prismaMock.studentTrackProgress.delete).toHaveBeenCalledWith({ where: { id: "some-id" } });
        });
        it("should throw ApiError on error", async () => {
            prismaMock.studentTrackProgress.delete.mockRejectedValue(new Error("fail"));
            await expect(repo.delete("fail")).rejects.toThrow(ApiError);
        });
    });
});
