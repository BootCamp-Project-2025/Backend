export interface IService<T> {
  get(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  update(id: string, object: T): Promise<T>;
  create(T: T): Promise<T>;
  delete(id: string): Promise<string | void>;
}
