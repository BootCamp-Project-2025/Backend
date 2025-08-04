import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { ICdnService } from "../../domain/interfaces/services/ICdnService";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { injectable } from "tsyringe";
dotenv.config();
@injectable()
export class CloudinaryService implements ICdnService {
  private cloudinary = cloudinary;

  constructor() {
    this.cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      const parts = fileName.split("/");
      const file = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
      await this.cloudinary.uploader.destroy(`${file}`, {
        invalidate: true,
        resource_type: "raw",
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      throw new ApiError(500, "Error deleting file");
    }
  }

  async updateFilePreset(url: string): Promise<string> {
    try {
      const result = await this.cloudinary.uploader.upload(url, {
        public_id: `${url.split("/").pop()}`,
        invalidate: true,
        upload_preset: "ltcrowd_preset",
        resource_type: "raw",
      });
      return result.secure_url;
    } catch (error) {
      console.error("Error updating Cloudinary file preset:", error);
      throw new ApiError(500, "Error updating preset");
    }
  }
}
