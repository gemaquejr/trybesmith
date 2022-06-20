import express from 'express';
import ProductRouter from './routes/ProductRoute';
import UserRouter from './routes/UserRoute';

const app = express();

app.use(express.json());
app.use('/products', ProductRouter);
app.use('/users', UserRouter);

export default app;
