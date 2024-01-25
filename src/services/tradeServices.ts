import { Share } from '../models/share'
import { Portfolio } from '../models/portfolio'
import { Transaction } from '../models/transaction'
import { sequelize } from '../config/database'
import { type TradeResult } from './interfaces/tradeResult'
import { type TransactionData } from './interfaces/transactionData.type'
export const executeBuyTrade = async (symbol: string, portfolioId: string, quantity: number): Promise<TradeResult> => {
  // Start a transaction
  const t = await sequelize.transaction()
  try {
    // Check if the share is registered
    const share = await Share.findByPk(symbol)
    if (share == null) {
      await t.rollback()
      return { error: 'Share not found' }
    }

    // Check if the portfolio is registered
    const portfolio = await Portfolio.findByPk(portfolioId)
    if (portfolio == null) {
      await t.rollback()
      return { error: 'Portfolio not found' }
    }

    // Assuming share.price is the latest price from the database
    const latestPrice = share.price

    // Record the BUY transaction
    const transactionData: TransactionData = {
        type: 'BUY',
        shareSymbol: share.symbol,
        portfolioId: portfolio.id,
        quantity,
        rate: latestPrice
    }

    await Transaction.create(transactionData as any)
    await t.commit()

    return { success: true }
  } catch (error) {
    await t.rollback()
    // Check if error is an instance of Error and has a message
    if (error instanceof Error) {
      return { error: error.message }
    }

    // Fallback error message
    return { error: 'An unexpected error occurred' }
  }
}

export const executeSellTrade = async (symbol: string, portfolioId: string, quantity: number) : Promise<TradeResult> => {
  const t = await sequelize.transaction();
  try {
    const portfolio = await Portfolio.findByPk(portfolioId);
    if (!portfolio) {
      await t.rollback();
      return { error: 'Portfolio not found' };
    }

    const share = await Share.findByPk(symbol);
    if (!share) {
      await t.rollback();
      return { error: 'Share not found' };
    }

    const transactions = await Transaction.findAll({
      where: { portfolioId, shareSymbol: symbol }
    });

    const totalShares = transactions.reduce((acc, transaction) => {
      return transaction.type === 'BUY' ? acc + transaction.quantity : acc - transaction.quantity;
    }, 0);

    if (quantity > totalShares) {
      await t.rollback();
      return { error: 'Not enough shares to sell' };
    }

    const transactionData: TransactionData = {
      type: 'SELL',
      shareSymbol: share.symbol,
      portfolioId: portfolio.id,
      quantity,
      rate: share.price
    };

    await Transaction.create(transactionData as any);

    await t.commit(); 
    return { success: true}
    } catch (error) {
    await t.rollback();
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unexpected error occurred' };
  }
};

