export interface IExternarlAuthService {
  updateUserRoles(userId: string, role: string): Promise<void>;
}
