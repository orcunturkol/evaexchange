import { sequelize } from '../config/database';
import { Share } from '../models/share';
import { Portfolio } from '../models/portfolio';
import { Transaction } from '../models/transaction';
import { executeBuyTrade, executeSellTrade } from '../services/tradeServices';

beforeAll(async () => {
    await sequelize.sync({ force: true });
      // Sample portfolios
    const portfolios = Array.from({ length: 2 }, (_, i) => ({
        id: `portfolio${i + 1}`
    }));
    await Portfolio.bulkCreate(portfolios as Portfolio[]);
    // Sample shares
    const shares = [
        { symbol: 'ABC', price: 100.00 },
        { symbol: 'DEF', price: 150.00 }
    ];
    await Share.bulkCreate(shares as Share[]);
  });
  
  afterEach(async () => {
    // Clean up transactions after each test
    await Transaction.destroy({ where: {} });
  });

    afterAll(async () => {
    await sequelize.close();
    });

    describe('executeBuyTrade', () => {
        test('should successfully execute a buy trade', async () => {
          const result = await executeBuyTrade('ABC', 'portfolio1', 5);
          expect(result).toEqual({ success: true });
          // Optionally, verify that the transaction was created in the database
          const transaction = await Transaction.findOne({ where: { shareSymbol: 'ABC', portfolioId: 'portfolio1' } });
          expect(transaction).not.toBeNull();
        });
      
        test('should return error for non-existent share', async () => {
          const result = await executeBuyTrade('XYZ', 'portfolio1', 5);
          expect(result).toEqual({ error: 'Share not found' });
        });
      
        test('should return error for non-existent portfolio', async () => {
          const result = await executeBuyTrade('ABC', 'portfolioX', 5);
          expect(result).toEqual({ error: 'Portfolio not found' });
        });
      });

      describe('executeSellTrade', () => {
        beforeEach(async () => {
          // Create initial shares for testing
          const transactions = [
            { type: 'BUY', shareSymbol: 'ABC', portfolioId: 'portfolio1', quantity: 10, rate: 100.00 },
            { type: 'BUY', shareSymbol: 'DEF', portfolioId: 'portfolio2', quantity: 5, rate: 150.00 }
          ];
          await Transaction.bulkCreate(transactions as Transaction[]);
          // Set up initial transactions for testing
        });
      
        test('should successfully execute a sell trade', async () => {
          const result = await executeSellTrade('ABC', 'portfolio1', 5);
          expect(result).toEqual({ success: true });
          // Optionally, verify that the sell transaction was created in the database
          const transaction = await Transaction.findOne({ where: { type: 'SELL', shareSymbol: 'ABC', portfolioId: 'portfolio1' } });
          expect(transaction).not.toBeNull();
        });
      
        test('should return error for non-existent share', async () => {
          const result = await executeSellTrade('XYZ', 'portfolio1', 5);
          expect(result).toEqual({ error: 'Share not found' });
        });
      
        test('should return error for non-existent portfolio', async () => {
          const result = await executeSellTrade('ABC', 'portfolioX', 5);
          expect(result).toEqual({ error: 'Portfolio not found' });
        });
      
        test('should return error for insufficient shares', async () => {
          const result = await executeSellTrade('ABC', 'portfolio1', 15);
          expect(result).toEqual({ error: 'Not enough shares to sell' });
        });
      });
