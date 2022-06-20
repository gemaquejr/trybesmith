import ProductModel from '../models/productModel';
import Product from '../interfaces/Products';
import connection from '../models/connection';

export default class ProductService {
  public productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel(connection);  
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.productModel.getAll();
    return products;
  }
}