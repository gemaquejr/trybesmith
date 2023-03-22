import { NextFunction, Request, Response } from 'express';
import User from '../interfaces/users.interface';

const properties = ['username', 'classe', 'level', 'password'];

const validateProperties = (user: User): [boolean, string | null] => {
  for (let index = 0; index < properties.length; index += 1) {
    if (!Object.prototype.hasOwnProperty.call(user, properties[index])) {
      return [false, properties[index]];
    }        
  }
  return [true, null];
};

const validateStrings = (user: User): [boolean, string | null] => {
  const { username, classe, password } = user;

  if (typeof username !== 'string') return [false, 'username'];   
  if (typeof classe !== 'string') return [false, 'classe'];   
  if (typeof password !== 'string') return [false, 'password'];   

  return [true, null];
};

const validateNumbers = (user: User): [boolean, string | null] => {
  const { level } = user;

  if (typeof level !== 'number') return [false, 'level'];   

  return [true, null];
};

const validateSize = (user: User): [boolean, string | null] => {
  const { username, classe, level, password } = user;

  if (username.length < 3) {
    const message = '"username" length must be at least 3 characters long';
    return [false, message];
  }
  if (classe.length < 3) {
    const message = '"classe" length must be at least 3 characters long';
    return [false, message];
  }
  if (level < 1) {
    const message = '"level" must be greater than or equal to 1';
    return [false, message];
  }
  if (password.length < 8) {
    const message = '"password" length must be at least 8 characters long';
    return [false, message];
  }
  return [true, null];
};

const userValidation = (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.body;

  let [isValid, property] = validateProperties(user);

  if (!isValid) {
    return res.status(400).json({ message: `"${property}" is required` });
  }

  [isValid, property] = validateStrings(user);

  if (!isValid) {
    return res.status(422).json({ message: `"${property}" must be a string` });
  }

  [isValid, property] = validateNumbers(user);

  if (!isValid) {
    return res.status(422).json({ message: `"${property}" must be a number` });
  }

  [isValid, property] = validateSize(user);

  if (!isValid) {
    return res.status(422).json({ message: property });
  }

  next();
};

export default userValidation;
