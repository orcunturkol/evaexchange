import { type Request, type Response } from 'express'
import { executeBuyTrade, executeSellTrade } from '../services/tradeServices'
import { sendResponse } from '../utils/responseUtil'
import { sendErrorResponse } from '../utils/errorResponseUtil'

/**
 * Handler for buying shares.
 * It extracts the symbol, portfolio ID, and quantity from the request body,
 * and then attempts to execute a buy trade using these details.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const buyShares = async (req: Request, res: Response) => {
  // Extract trade details from request body
  const { symbol, portfolioId, quantity } = req.body;

  // Attempt to execute buy trade
  const result = await executeBuyTrade(symbol, portfolioId, quantity);

  // Check for errors and respond accordingly
  if (result?.error) {
    sendErrorResponse(res, 400, result.error);
    return;
  }

  // Send success response
  sendResponse(res, 200, 'Buy operation successful', true);
}

/**
 * Handler for selling shares.
 * It extracts the symbol, portfolio ID, and quantity from the request body,
 * and then attempts to execute a sell trade using these details.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const sellShares = async (req: Request, res: Response) => {
  // Extract trade details from request body
  const { symbol, portfolioId, quantity } = req.body;

  // Attempt to execute sell trade
  const result = await executeSellTrade(symbol, portfolioId, quantity);

  // Check for errors and respond accordingly
  if (result?.error) {
    sendErrorResponse(res, 400, result.error);
    return;
  }

  // Send success response
  sendResponse(res, 200, 'Sell operation successful', true);
}
