import { Request, Response } from 'express';
import OrderService from '../services/OrderService';

export default class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    // Dica com o Pedrão na mentoria para fazer um map. (Valeu, Pedrão !!!!)
    const object = orders.map((i) => ({
      id: i.id,
      userId: i.userId,
      productsIds: [i.productsIds],
    }));
    res.status(200).json(object);
  };
}
