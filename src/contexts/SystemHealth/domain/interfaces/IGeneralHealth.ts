import { IApiHealth } from "./IApiHealth";
import { IDBHealth } from "./IDBHealth";

export interface IGeneralHealth {
  apiStatus: IApiHealth;
  dbStatus: IDBHealth;
}
