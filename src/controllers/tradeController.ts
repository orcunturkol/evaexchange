import { type Request, type Response } from 'express'
import { executeBuyTrade, executeSellTrade } from '../services/tradeServices'
import { sendResponse } from '../utils/responseUtil'
import { sendErrorResponse } from '../utils/errorResponseUtil'

export const buyShares = async (req: Request, res: Response) => {
  const { symbol, portfolioId, quantity } = req.body
  const result = await executeBuyTrade(symbol, portfolioId, quantity)

  if ((result?.error) != null) {
    sendErrorResponse(res, 400, result.error); return
  }
  sendResponse(res, 200, 'Buy operation successful', true)
}

export const sellShares = async (req: Request, res: Response) => {
    const { symbol, portfolioId, quantity } = req.body
    const result = await executeSellTrade(symbol, portfolioId, quantity)

    if ((result?.error) != null) {
      sendErrorResponse(res, 400, result.error); return
    }
    sendResponse(res, 200, 'Sell operation successful', true)
}
