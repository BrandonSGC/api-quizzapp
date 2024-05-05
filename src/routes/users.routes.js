import { Router } from 'express';
import { getUserById, createUser, login, logout } from '../controllers/users.controller.js';

const router = Router();

router.post('/', createUser);
router.get('/:id', getUserById);
router.post('/login', login);
router.post('/logout', logout);

export default router;