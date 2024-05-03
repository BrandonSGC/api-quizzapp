import { Router } from 'express';
import { getUserById, createUser, login } from '../controllers/users.controller.js';

const router = Router();

router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/login', login);

export default router;