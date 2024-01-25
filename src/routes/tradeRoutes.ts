import { Router } from 'express';
import { buyShares, sellShares } from '../controllers/tradeController';

const router = Router();

router.post('/buy', buyShares);
router.post('/sell', sellShares);

export default router;
