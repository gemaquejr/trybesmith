import LoginModel from '../models/login.model';

export default class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel();
  }

  public async login(user: { name:string, password:string }): Promise<string> {
    const newToken = this.model.login(user);

    return newToken;
  }
}