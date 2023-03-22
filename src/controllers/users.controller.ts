import { Request, Response } from 'express';
import UserService from '../services/users.service';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const users = await this.userService.getAll();
    res.status(200).json(users);
  };

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const createdUserToken = await this.userService.create(user);

    res.status(201).json({ token: createdUserToken });
  };
}
