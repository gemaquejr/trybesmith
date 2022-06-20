import { Request, Response } from 'express';
import ProductService from '../services/ProductService';

export default class ProductController {
  constructor(private productService = new ProductService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  };

  public post = async (req: Request, res: Response) => {
    const { name, amount } = req.body;
    const addProducts = await this.productService.post({ name, amount });
    res.status(201).json(addProducts);
  };
}
