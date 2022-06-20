import { NextFunction, Request, Response } from 'express';

const validateUserUserLevel = (req: Request, res: Response, next: NextFunction) => {
  const { level } = req.body;

  if (level === undefined) {
    return res.status(400).json({ message: '"level" is required' });
  }

  if (typeof level !== 'number') {
    return res.status(422).json({ message: '"level" must be a number' });
  }

  if (typeof level !== 'number' || level < 1) {
    return res.status(422)
      .json({ message: '"level" must be greater than or equal to 1' });
  }

  return next();
};

export default validateUserUserLevel;