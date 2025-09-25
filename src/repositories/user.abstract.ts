import { IUser } from "../database/models/user";
import { IRegisterUser } from "../interfaces/user";

export abstract class UserAbstract {
  abstract create(item: IRegisterUser): Promise<IUser>;
  abstract findById(id: string | number): Promise<IUser | null>;
  abstract findByEmail(string: string | number): Promise<IUser | null>;
}
