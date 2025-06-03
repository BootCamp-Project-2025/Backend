import { IApiHealth } from "../IApiHealth";
import { IDBHealth } from "../IDbHealth";
import { IGeneralHealth } from "../IGeneralHealth";

export class GeneralHealth implements IGeneralHealth {
  constructor(
    public apiStatus: IApiHealth,
    public dbStatus: IDBHealth
  ) {}
}
