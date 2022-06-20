import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/Users';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async post(newUser: User) {
    const { username, classe, level, password } = newUser;
    const [users] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [newUser.username, newUser.classe, newUser.level, newUser.password],
    );
    const result = users;
    const { insertId } = result;
    return { id: insertId, username, classe, level, password };
  }
}