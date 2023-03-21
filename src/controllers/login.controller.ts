import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const newLoginToken = await this.loginService.login({ name: username, password });

    res.status(200).json({ token: newLoginToken });
  };
}