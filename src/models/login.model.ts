import token from '../auth/users.auth';

export default class LoginModel {
  public token;

  constructor() {
    this.token = token;
  }

  public async login(user: { name:string, password:string }): Promise<string> {
    const newToken = this.token(user);

    return newToken;
  }
}