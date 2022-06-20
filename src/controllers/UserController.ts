import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService = new UserService()) { }

  public post = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;
    const addUsers = await this.userService.post({ username, classe, level, password });
    if (!addUsers) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
    SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;
    return res.status(201).json({ token });
  };
}
