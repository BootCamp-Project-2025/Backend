import "reflect-metadata";
import { CourseService } from "../../../../../src/contexts/LearningContext/application/services/CourseService";
import { CourseDTO } from "../../../../../src/contexts/LearningContext/domain/dtos/CourseDTO";
import { Course } from "../../../../../src/contexts/LearningContext/domain/aggregates/Course";
import { CourseMapper } from "../../../../../src/contexts/LearningContext/mappers/CourseMapper";

describe("CourseService", () => {
  let getAllCoursesUseCase: { execute: jest.Mock };
  let getCourseUseCase: { execute: jest.Mock };
  let EditCourseUseCase: { execute: jest.Mock };
  let createCourseUseCase: { execute: jest.Mock };
  let updateCourseUseCase: { execute: jest.Mock };
  let deleteCourseUseCase: { execute: jest.Mock };
  let service: CourseService;

  beforeEach(() => {
    getAllCoursesUseCase = { execute: jest.fn() };
    getCourseUseCase = { execute: jest.fn() };
    EditCourseUseCase = { execute: jest.fn() };
    createCourseUseCase = { execute: jest.fn() };
    updateCourseUseCase = { execute: jest.fn() };
    deleteCourseUseCase = { execute: jest.fn() };

    service = new CourseService(
      getAllCoursesUseCase,
      getCourseUseCase,
      EditCourseUseCase,
      createCourseUseCase,
      updateCourseUseCase,
      deleteCourseUseCase
    );
  });

  describe("getAllCourses", () => {
    it("should call the mapper with (course, index, array)", async () => {
      const fakeDomainCourses: Course[] = [{} as Course];
      getAllCoursesUseCase.execute.mockResolvedValue(fakeDomainCourses);

      const fakeDTO: CourseDTO = {
        id: "1",
        name: "n",
        description: "d",
        imgSrc: "i",
        userId: "userId",
      };
      jest.spyOn(CourseMapper, "toAplicationDTO").mockReturnValue(fakeDTO);

      const result = await service.getAllCourses();

      expect(getAllCoursesUseCase.execute).toHaveBeenCalledTimes(1);
      expect(CourseMapper.toAplicationDTO).toHaveBeenCalledWith(
        fakeDomainCourses[0],
        0,
        fakeDomainCourses
      );
      expect(result).toEqual([fakeDTO]);
    });
  });

  describe("create", () => {
    it("should call createCourseUseCase and return the created DTO", async () => {
      const inputDto: CourseDTO = {
        id: "abc",
        name: "Nuevo",
        description: "Descripcion",
        imgSrc: "http:",
        userId: "userId",
      };
      const fakeDomain: Course = {} as unknown as Course;
      createCourseUseCase.execute.mockResolvedValue(fakeDomain);

      const fakeCreatedDto: CourseDTO = { ...inputDto };
      jest
        .spyOn(CourseMapper, "toAplicationDTO")
        .mockReturnValue(fakeCreatedDto);

      const result = await service.create(inputDto);
      expect(createCourseUseCase.execute).toHaveBeenCalledWith(inputDto);
      expect(result).toEqual(fakeCreatedDto);
    });
  });

  describe("updateCourse", () => {
    it("should call updateCourseUseCase with id + dto and return the updated DTO", async () => {
      const id = "123";
      const updateDto: CourseDTO = {
        id: "abc",
        name: "Upd",
        description: "DescUpd",
        imgSrc: "http:",
        userId: "userId",
      };
      const fakeDomain: Course = {} as unknown as Course;
      updateCourseUseCase.execute.mockResolvedValue(fakeDomain);

      const fakeUpdatedDto: CourseDTO = { ...updateDto };
      jest
        .spyOn(CourseMapper, "toAplicationDTO")
        .mockReturnValue(fakeUpdatedDto);

      const result = await service.updateCourse(id, updateDto);
      expect(updateCourseUseCase.execute).toHaveBeenCalledWith({
        ...updateDto,
      });
      expect(result).toEqual(fakeUpdatedDto);
    });
  });

  describe("deleteCourse", () => {
    it("should call deleteCourseUseCase with the id and not return anything", async () => {
      const id = "to-delete";
      deleteCourseUseCase.execute.mockResolvedValue(undefined);

      await expect(service.deleteCourse(id)).resolves.toBeUndefined();
      expect(deleteCourseUseCase.execute).toHaveBeenCalledWith(id);
    });
  });
});
