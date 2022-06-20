import { Pool } from 'mysql2/promise';
import Product from '../interfaces/Products';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Product[]> {
    const [products] = await this.connection.execute('SELECT * FROM Trybesmith.Products;');
    return products as Product[];
  }
}