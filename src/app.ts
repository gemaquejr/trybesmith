import express from 'express';
import ProductRouter from './routes/ProductRoute';
import UserRouter from './routes/UserRoute';
import OrderRouter from './routes/OrderRoute';
import LoginRoutes from './routes/login.routes';

const app = express();

app.use(express.json());
app.use('/products', ProductRouter);
app.use('/users', UserRouter);
app.use('/orders', OrderRouter);
app.use(LoginRoutes);

export default app;
