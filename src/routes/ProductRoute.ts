import express from 'express';
import ProductController from '../controllers/ProductController';

import validateName from '../middlewares/validateProductName';
import validateAmount from '../middlewares/validateProductAmount';

const router = express.Router();

const productController = new ProductController();

router.get('/', productController.getAll);
router.post('/', validateName, validateAmount, productController.post);

export default router;