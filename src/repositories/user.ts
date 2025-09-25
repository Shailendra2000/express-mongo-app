import User, { IUser } from "../database/models/user";
import { IRegisterUser } from "../interfaces/user";
import { UserAbstract } from "./user.abstract";

export class UserRepository extends UserAbstract {
  async create(item: IRegisterUser): Promise<IUser> {
    return User.create(item);
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).exec();
  }
}
