import "reflect-metadata";
import { Course as PrismaCourse } from "@/generated/prisma";

jest.mock(
  "../../../../../src/contexts/Shared/infrastructure/database/PrismaClient",
  () => ({
    __esModule: true,
    default: {
      course: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    },
  })
);

import prismaClient from "../../../../../src/contexts/Shared/infrastructure/database/PrismaClient";
import { CourseRepository } from "../../../../../src/contexts/LearningContext/infrastructure/database/CourseRepository";
import { CourseMapper } from "../../../../../src/contexts/LearningContext/mappers/CourseMapper";
import { Course } from "../../../../../src/contexts/LearningContext/domain/aggregates/Course";

describe("CourseRepository (Prisma)", () => {
  let repo: CourseRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repo = new CourseRepository();
  });

  describe("findById", () => {
    it("returns null when no record is found", async () => {
      (prismaClient.course.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repo.findById("nope");
      expect(prismaClient.course.findUnique).toHaveBeenCalledWith({
        where: { id: "nope" },
      });
      expect(result).toBeNull();
    });

    it("maps a found record to a Course", async () => {
      const raw = {
        id: "1",
        name: "n",
        field: "f",
        requirements: "r",
        description: "d",
        time: 5,
        imgSrc: "i",
      };
      (prismaClient.course.findUnique as jest.Mock).mockResolvedValue(raw);

      const domainCourse = {} as Course;
      jest.spyOn(CourseMapper, "toDomain").mockReturnValue(domainCourse);

      const result = await repo.findById("1");
      expect(prismaClient.course.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(CourseMapper.toDomain).toHaveBeenCalledWith(raw);
      expect(result).toBe(domainCourse);
    });
  });

  describe("findAll", () => {
    it("returns all records mapped to Courses", async () => {
      const raws = [
        {
          id: "1",
          name: "n1",
          field: "f1",
          requirements: "r1",
          description: "d1",
          time: 1,
          imgSrc: "i1",
        },
        {
          id: "2",
          name: "n2",
          field: "f2",
          requirements: "r2",
          description: "d2",
          time: 2,
          imgSrc: "i2",
        },
      ];

      (prismaClient.course.findMany as jest.Mock).mockResolvedValue(raws);

      const domainCourses = [{} as Course, {} as Course];

      const toDomainMock = jest.spyOn(CourseMapper, "toDomain");
      toDomainMock
        .mockReturnValueOnce(domainCourses[0])
        .mockReturnValueOnce(domainCourses[1]);

      const result = await repo.findAll();

      expect(prismaClient.course.findMany).toHaveBeenCalled();
      expect(CourseMapper.toDomain).toHaveBeenCalledTimes(2);
      expect(result).toEqual(domainCourses);
    });
  });

  describe("insert", () => {
    it("persists a new Course and returns the mapped aggregate", async () => {
      const newDomain = {} as Course;
      const persistence: PrismaCourse = {
        id: "3",
        name: "n",
        field: "f",
        requirements: "r",
        description: "d",
        time: 3,
        imgSrc: "i",
        language: "",
        category: "",
        subCategory: "",
        userId: "userId",
        published: false,
        createdAt: new Date(),
      };
      jest.spyOn(CourseMapper, "toPersistence").mockReturnValue(persistence);

      const raw = {
        id: "3",
        name: "n",
        field: "f",
        requirements: "r",
        description: "d",
        time: 3,
        imgSrc: "i",
      };
      (prismaClient.course.create as jest.Mock).mockResolvedValue(raw);

      const mappedDomain = {} as Course;
      jest.spyOn(CourseMapper, "toDomain").mockReturnValue(mappedDomain);

      const result = await repo.insert(newDomain);
      expect(CourseMapper.toPersistence).toHaveBeenCalledWith(newDomain);
      expect(prismaClient.course.create).toHaveBeenCalledWith({
        data: persistence,
      });
      expect(CourseMapper.toDomain).toHaveBeenCalledWith(raw);
      expect(result).toBe(mappedDomain);
    });
  });

  describe("update", () => {
    it("persists changes and returns the mapped aggregate", async () => {
      const existing = { id: { toString: () => "4" } } as Course;
      const persistence: PrismaCourse = {
        id: "3",
        name: "n",
        field: "f",
        requirements: "r",
        description: "d",
        time: 3,
        imgSrc: "i",
        language: "",
        category: "",
        subCategory: "",
        userId: "userId",
        published: false,
        createdAt: new Date(),
      };
      jest.spyOn(CourseMapper, "toPersistence").mockReturnValue(persistence);
      jest.spyOn(repo, "nameAvailable").mockResolvedValue(true);
      const raw = {
        id: "4",
        name: "nx",
        field: "fx",
        requirements: "rx",
        description: "dx",
        time: 4,
        imgSrc: "ix",
      };
      (prismaClient.course.update as jest.Mock).mockResolvedValue(raw);

      const mappedDomain = {} as Course;
      jest.spyOn(CourseMapper, "toDomain").mockReturnValue(mappedDomain);

      const result = await repo.update(existing);
      expect(CourseMapper.toPersistence).toHaveBeenCalledWith(existing);
      expect(prismaClient.course.update).toHaveBeenCalledWith({
        where: { id: "4" },
        data: persistence,
      });
      expect(CourseMapper.toDomain).toHaveBeenCalledWith(raw);
      expect(result).toBe(mappedDomain);
    });
  });

  describe("delete", () => {
    it("removes the record by id", async () => {
      (prismaClient.course.delete as jest.Mock).mockResolvedValue(undefined);
      await expect(repo.delete("5")).resolves.toBeUndefined();
      expect(prismaClient.course.delete).toHaveBeenCalledWith({
        where: { id: "5" },
      });
    });
  });
});
