import { Router } from 'express';
import { buyShares, sellShares } from '../controllers/tradeController';
import { validateTrade } from '../validations/validateTrade';
const router = Router();

router.post('/buy', validateTrade, buyShares);
router.post('/sell', validateTrade, sellShares);

export default router;
