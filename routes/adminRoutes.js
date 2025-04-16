import { Router } from 'express';
import { adminDashboard } from '../controllers/adminController.js';
import { authenticateJWT, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateJWT, requireAdmin, adminDashboard);

export default router;
