import UserModel from '../models/users.model';
import User from '../interfaces/Users';
import connection from '../models/connection';

export default class UserService {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);  
  }

  public async post(newUser: User): Promise<User> {
    return this.userModel.post(newUser);
  }
}