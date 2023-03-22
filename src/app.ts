import express from 'express';
import ProductsRoutes from './routes/product.routes';
import UsersRoutes from './routes/users.routes';
import OrderRoutes from './routes/order.routes';
import LoginRoutes from './routes/login.routes';

const app = express();

app.use(express.json());
app.use(ProductsRoutes);
app.use(UsersRoutes);
app.use(OrderRoutes);
app.use(LoginRoutes);

export default app;
