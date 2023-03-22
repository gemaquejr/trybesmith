import { Router } from 'express';
import UserController from '../controllers/users.controller';
import userValidation from '../middlewares/users.middlewares';

const router = Router();

const userController = new UserController();

router.get('/users', userController.getAll);
router.post('/users', userValidation, userController.create);

export default router;