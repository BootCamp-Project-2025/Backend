import "reflect-metadata";

jest.mock(
  "@/contexts/LearningContext/domain/interfaces/IModuleService",
  () => ({
    ResponseService: {
      send: jest.fn(),
    },
  })
);
