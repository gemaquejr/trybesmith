import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

// In Real Project this would be an environment variable
const secret = 'superDuperSecreKey';

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    const message = { message: 'Token not found' };
    return res.status(401).json(message);
  }

  try {
    const decoded = verify(token, secret);
    if (typeof decoded !== 'string') req.body.user = decoded.data;
    next();
  } catch (error) {
    const message = { message: 'Invalid token' };
    return res.status(401).json(message);
  }
};

export default tokenValidation;