import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/Users';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<User[]> {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.Users');
    const [rows] = result;
    return rows as User[];
  }

  public async create(user: User): Promise<User> {
    const { username, classe, level, password } = user;
    await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    return user;
  }
}