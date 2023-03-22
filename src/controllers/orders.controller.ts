import { Request, Response } from 'express';
import OrderService from '../services/orders.service';

export default class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(200).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const { productsIds, user } = req.body;
    const userName = user.name;

    const result = await this.orderService.create({ productsIds, userName });

    res.status(201).json(result);
  };
}