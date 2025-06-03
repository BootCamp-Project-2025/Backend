import { IApiHealth } from "./IApiHealth";
import { IDBHealth } from "./IDbHealth";

export interface IGeneralHealth {
  apiStatus: IApiHealth;
  dbStatus: IDBHealth;
}
