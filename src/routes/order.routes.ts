import { Router } from 'express';
import OrderController from '../controllers/orders.controller';
import orderValidation from '../middlewares/orders.middleware';
import tokenValidation from '../auth/middleware.auth';

const router = Router();

const orderController = new OrderController();

router.get('/orders', orderController.getAll);
router.post('/orders', tokenValidation, orderValidation, orderController.create);

export default router;