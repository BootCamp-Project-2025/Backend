import "reflect-metadata";
import IModuleService

jest.mock("@/contexts/Shared/application/services/ResponseService", () => ({
  ResponseService: {
    send: jest.fn(),
  },
}));