import express from 'express';
import OrderController from '../controllers/OrderController';

const router = express.Router();

const orderController = new OrderController();

router.get('/', orderController.getAll);

export default router;