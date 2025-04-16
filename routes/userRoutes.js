import { Router } from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateJWT, getAllUsers);

export default router;
