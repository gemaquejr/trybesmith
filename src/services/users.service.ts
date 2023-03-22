import connection from '../models/connection';
import User from '../interfaces/users.interface';
import UserModel from '../models/users.model';
import token from '../auth/users.auth';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async getAll(): Promise<User[]> {
    const users = await this.model.getAll();
    return users;
  }

  public async create(user: User): Promise<string> {
    const newUser = await this.model.create(user);

    const newToken = token(newUser);

    return newToken;
  }
}