import { Share } from '../models/share'
import { Portfolio } from '../models/portfolio'
import { Transaction } from '../models/transaction'
import { sequelize } from '../config/database'
import { type TradeResult } from './interfaces/tradeResult'
import { type TransactionData } from './interfaces/transactionData.type'
/**
 * Executes a BUY trade transaction.
 * 
 * @param symbol - The symbol of the share to buy.
 * @param portfolioId - The ID of the buyer's portfolio.
 * @param quantity - The number of shares to buy.
 * @returns A promise that resolves to the trade result.
 */
export const executeBuyTrade = async (symbol: string, portfolioId: string, quantity: number): Promise<TradeResult> => {
  const t = await sequelize.transaction();

  try {
    const share = await Share.findByPk(symbol);
    // Check if the requested share exists
    if (!share) {
      await t.rollback();
      return { error: 'Share not found' };
    }

    const portfolio = await Portfolio.findByPk(portfolioId);
    // Check if the portfolio exists
    if (!portfolio) {
      await t.rollback();
      return { error: 'Portfolio not found' };
    }

    const latestPrice = share.price; // Assume latest price from the database

    const transactionData: TransactionData = {
      type: 'BUY',
      shareSymbol: share.symbol,
      portfolioId: portfolio.id,
      quantity,
      rate: latestPrice
    };

    // Create the transaction and commit
    await Transaction.create(transactionData as any);
    await t.commit();

    return { success: true };
  } catch (error) {
    await t.rollback();
    return { error: error instanceof Error ? error.message : 'An unexpected error occurred' };
  }
};

/**
 * Executes a SELL trade transaction.
 * 
 * @param symbol - The symbol of the share to sell.
 * @param portfolioId - The ID of the seller's portfolio.
 * @param quantity - The number of shares to sell.
 * @returns A promise that resolves to the trade result.
 */
export const executeSellTrade = async (symbol: string, portfolioId: string, quantity: number): Promise<TradeResult> => {
  const t = await sequelize.transaction();

  try {
    const portfolio = await Portfolio.findByPk(portfolioId);
    // Check if the portfolio exists
    if (!portfolio) {
      await t.rollback();
      return { error: 'Portfolio not found' };
    }

    const share = await Share.findByPk(symbol);
    // Check if the share exists
    if (!share) {
      await t.rollback();
      return { error: 'Share not found' };
    }

    const transactions = await Transaction.findAll({ where: { portfolioId, shareSymbol: symbol } });
    // Calculate total shares owned
    const totalShares = transactions.reduce((acc, transaction) => transaction.type === 'BUY' ? acc + transaction.quantity : acc - transaction.quantity, 0);

    // Validate sufficient shares to sell
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

    // Create the transaction and commit
    await Transaction.create(transactionData as any);
    await t.commit(); 

    return { success: true };
  } catch (error) {
    await t.rollback();
    return { error: error instanceof Error ? error.message : 'An unexpected error occurred' };
  }
};