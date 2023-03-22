import connection from '../models/connection';
import OrderModel from '../models/orders.model';
import ProductModel from '../models/products.model';
import CompletedOrder from '../interfaces/completedOrder.interface';

export default class OrderService {
  public orderModel: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<CompletedOrder[]> {
    const products = await this.productModel.getAll();
    const orders = await this.orderModel.getAll();

    const completedOrders: CompletedOrder[] = orders.map((order) => ({
      ...order,
      productsIds: [], 
    }));

    completedOrders.forEach((order) => {
      products.forEach((product) => {
        if (order.id === product.orderId) {
          const id = product.id === undefined
            ? 0
            : product.id;          
          order.productsIds.push(id);
        }
      });
    });

    return completedOrders;
  }

  public create(order: {
    productsIds: number[],
    userName: string 
  }): Promise<{ productsIds: number[], userId: number }> {
    return this.orderModel.create(order);
  }
}