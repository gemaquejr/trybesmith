import express from 'express';
import OrderController from '../controllers/OrderController';
import orderValidation from '../middlewares/order.middleware';
import tokenValidation from '../auth/auth.middleware';

const router = express.Router();

const orderController = new OrderController();

router.get('/', orderController.getAll);
router.post('/orders', tokenValidation, orderValidation, orderController.create);

export default router;