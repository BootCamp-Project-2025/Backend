import "reflect-metadata";
import { CloudinaryService } from "../../../../../src/contexts/CoreContext/infrastructure/cdn/CloundinaryService";
import { v2 as cloudinary } from "cloudinary";

jest.mock("cloudinary", () => ({
  v2: {
    uploader: {
      destroy: jest.fn(),
      upload: jest.fn(),
    },
    config: jest.fn(),
  },
}));

describe("CloudinaryService", () => {
  let service: CloudinaryService;

  beforeEach(() => {
    service = new CloudinaryService();
    jest.clearAllMocks();
  });

  describe("updateFilePreset", () => {
    it("should upload file and return secure_url from result", async () => {
      const mockUrl = "http://example.com/file.txt";
      const mockSecureUrl = "https://cloudinary.com/prod/file.txt";
      (cloudinary.uploader.upload as jest.Mock).mockResolvedValue({
        secure_url: mockSecureUrl,
      });

      const result = await service.updateFilePreset(mockUrl);

      expect(cloudinary.uploader.upload).toHaveBeenCalledWith(mockUrl, {
        public_id: "file.txt",
        invalidate: true,
        folder: "prod",
        resource_type: "raw",
      });
      expect(result).toBe(mockSecureUrl);
    });

    it("should throw error and log when upload fails", async () => {
      const mockUrl = "http://example.com/file.txt";
      const mockError = new Error("Upload failed");
      (cloudinary.uploader.upload as jest.Mock).mockRejectedValue(mockError);
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      await expect(service.updateFilePreset(mockUrl)).rejects.toThrow(
        "Upload failed"
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error updating Cloudinary file preset:",
        mockError
      );

      consoleSpy.mockRestore();
    });
  });
});
