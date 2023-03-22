import { NextFunction, Request, Response } from 'express';
import Product from '../interfaces/products.interface';

const properties = ['name', 'amount'];

const validateProperties = (product: Product): [boolean, string | null] => {
  for (let index = 0; index < properties.length; index += 1) {
    if (!Object.prototype.hasOwnProperty.call(product, properties[index])) {
      return [false, properties[index]];
    }        
  }
  return [true, null];
};

const validateType = (product: Product): [boolean, string | null] => {
  const entries = Object.entries(product);
  for (let index = 0; index < entries.length; index += 1) {
    const [property, value] = entries[index];
    if (typeof value !== 'string') return [false, property];
  }
  return [true, null];
};

const validateSize = (product: Product): [boolean, string | null] => {
  const entries = Object.entries(product);
  for (let index = 0; index < entries.length; index += 1) {
    const [property, value] = entries[index];
    if (value < 3) return [false, property];
  }
  return [true, null];
};

const productValidation = (req: Request, res: Response, next: NextFunction) => {
  const product: Product = req.body;

  let [isValid, property] = validateProperties(product);

  if (!isValid) {
    return res.status(400).json({ message: `"${property}" is required` });
  }

  [isValid, property] = validateType(product);

  if (!isValid) {
    return res.status(422).json({ message: `"${property}" must be a string` });
  }

  [isValid, property] = validateSize(product);

  if (!isValid) {
    const message = `"${property}" length must be at least 3 characters long`;
    return res.status(422).json({ message });
  }

  next();
};

export default productValidation;
