import { Pool, ResultSetHeader } from 'mysql2/promise';
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

  public async post(newProduct: Product) {
    const { name, amount } = newProduct;
    const [products] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [newProduct.name, newProduct.amount],
    );
    const result = products;
    const { insertId } = result;
    return { id: insertId, name, amount };
  }
}