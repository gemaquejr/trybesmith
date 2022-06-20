import express from 'express';
import UserController from '../controllers/UserController';

import validateUsername from '../middlewares/validateUserUsername';
import validateClasse from '../middlewares/validateUserClasse';
import validateLevel from '../middlewares/validateUserLevel';
import validatePassword from '../middlewares/validateUserPassword';

const router = express.Router();

const userController = new UserController();

router.post(
  '/',
  validateUsername,

  validateClasse,

  validateLevel,

  validatePassword,

  userController.post,
);

export default router;