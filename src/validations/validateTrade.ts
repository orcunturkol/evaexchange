import { body, validationResult } from 'express-validator';
import { sendErrorResponse } from '../utils/errorResponseUtil';
import { Request, Response, NextFunction } from 'express';

export const validateTrade = [
    body('symbol').isLength({ min: 3, max: 3 }).isUppercase(),
    body('portfolioId').isString(),
    body('quantity').isInt({ min: 1 }),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return sendErrorResponse(res, 400, errors.array()[0].msg);
      }
      next();
    },
  ]; 