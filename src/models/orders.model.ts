import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/orders.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.Orders');
    const [rows] = result;

    return rows as Order[];
  }

  public async getUserIdByUserName(userName: string): Promise<{ id: number }[]> {
    const result = await this.connection.execute(
      'SELECT id FROM Trybesmith.Users WHERE username=?',
      [userName],
    );
    const [rows] = result;
    return rows as { id: number }[];
  }

  public async create(order: { 
    productsIds: number[],
    userName: string
  }): Promise<{ productsIds: number[], userId: number }> {
    const { productsIds, userName } = order;

    const userResult = await this.getUserIdByUserName(userName);
    const userId = userResult[0].id;

    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;

    await Promise.all(productsIds.map(async (productId) => {
      const query = 'UPDATE Trybesmith.Products SET orderId=? WHERE id=?';
      await this.connection.execute(query, [insertId, productId]);
    }));

    return { productsIds, userId };
  }
}