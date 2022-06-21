import { Pool } from 'mysql2/promise';
import Order from '../interfaces/Orders';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const [orders] = await this.connection.execute(`SELECT Orders.id, Orders.userId, Products.id
    AS productsIds
    FROM Trybesmith.Orders AS Orders INNER JOIN Trybesmith.Products AS Products
    ON Products.orderId = Orders.id;`);
    return orders as Order[];
  }
}