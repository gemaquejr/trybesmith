import { sign, SignOptions } from 'jsonwebtoken';
import User from '../interfaces/users.interface';

const secret = 'superDuperSecreKey';

const jwtConfig: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

const token = (user: User | { name:string, password:string }) => {
  const newToken = sign({ data: user }, secret, jwtConfig);
  return newToken;
};
export default token;