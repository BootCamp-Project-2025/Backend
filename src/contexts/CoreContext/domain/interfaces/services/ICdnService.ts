export interface ICdnService {
  deleteFile(fileName: string): Promise<void>;
  updateFilePreset(fileName: string): Promise<string>;
}
