import express from 'express';
import ProductRouter from './routes/ProductRoute';
import UserRouter from './routes/UserRoute';
import OrderRouter from './routes/OrderRoute';

const app = express();

app.use(express.json());
app.use('/products', ProductRouter);
app.use('/users', UserRouter);
app.use('/orders', OrderRouter);

export default app;
