import { Router } from 'express';
import { getUserById, createUser, login, logout, profile } from '../controllers/users.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/', createUser);
router.get('/:id', getUserById);
router.post('/login', login);
router.post('/logout', logout);
router.get('/', authRequired, profile);

export default router;
