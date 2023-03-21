import OrderModel from '../models/orderModel';
import Order from '../interfaces/Orders';
import connection from '../models/connection';

export default class OrderService {
  public orderModel: OrderModel;

  constructor() {
    this.orderModel = new OrderModel(connection);  
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.orderModel.getAll();
    return orders;
  }

  public create(order: {
    productsIds: number[],
    userName: string 
  }): Promise<{ productsIds: number[], userId: number }> {
    return this.orderModel.create(order);
  }
}