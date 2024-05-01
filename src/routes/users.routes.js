import { Router } from 'express';
import { getUserById, createUser } from '../controllers/users.controller.js';

const router = Router();

router.get('/:id', getUserById);
router.post('/', createUser);

export default router;