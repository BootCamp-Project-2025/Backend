import { IApiHealth } from "../interfaces/IApiHealth";
import { IDBHealth } from "../interfaces/IDBHealth";
import { IGeneralHealth } from "../interfaces/IGeneralHealth";

export class GeneralHealth implements IGeneralHealth {
  constructor(
    public apiStatus: IApiHealth,
    public dbStatus: IDBHealth
  ) {}
}
