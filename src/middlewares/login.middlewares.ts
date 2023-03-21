import { NextFunction, Request, Response } from 'express';
import connection from '../models/connection';
import UserModel from '../models/users.model';

const properties = ['username', 'password'];

const validateProperties = (user: { 
  username:string, 
  password:string
}): [boolean, string | null] => {
  for (let index = 0; index < properties.length; index += 1) {
    if (!Object.prototype.hasOwnProperty.call(user, properties[index])) {
      return [false, properties[index]];
    }        
  }
  return [true, null];
};

const validateCredencials = async (user: { 
  username:string, 
  password:string
}): Promise<[boolean, null]> => {
  const model = new UserModel(connection);
  const userList = await model.getAll();
  const { username, password } = user;

  for (let index = 0; index < userList.length; index += 1) {
    const userInfo = userList[index];
    if (userInfo.password === password && userInfo.username === username) return [true, null];
  }

  return [false, null];
};

const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const user: { username:string, password:string } = req.body;

  let [isValid, property] = validateProperties(user);

  if (!isValid) {
    return res.status(400).json({ message: `"${property}" is required` });
  }

  [isValid, property] = await validateCredencials(user);

  if (!isValid) {
    return res.status(401).json({ message: 'Username or password invalid' });
  }

  next();
};

export default loginValidation;