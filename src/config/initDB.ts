import { Portfolio} from './../models/portfolio';
import { Share } from './../models/share';
import { Transaction } from './../models/transaction';
import { logger } from '../utils/winstonLogger';

/**
 * Initializes the database with sample data if it is empty.
 * This includes creating sample portfolios, shares, and transactions.
 */
export const initializeDatabase = async () => {
  // Check if any data already exists in the database
  const existingDataCount = await Promise.all([
    Portfolio.count(),
    Share.count(),
    Transaction.count()
  ]);

  // If data exists, log a message and exit the function
  if (existingDataCount.some(count => count > 0)) {
    logger.info('Database already initialized with sample data!');
    return;
  }

  // Generate sample portfolios
  const portfolios = Array.from({ length: 5 }, (_, i) => ({
    id: `portfolio${i + 1}`
  }));

  // Define sample shares
  const shares = [
    { symbol: 'ABC', price: 100.00 },
    { symbol: 'DEF', price: 150.00 },
    { symbol: 'GHI', price: 200.00 }
  ];

  // Generate sample transactions with random types, quantities, and rates
  const transactions = portfolios.flatMap(portfolio => {
    return ['ABC', 'DEF', 'GHI'].map(symbol => ({
      type: Math.random() > 0.5 ? 'BUY' : 'SELL',
      shareSymbol: symbol,
      portfolioId: portfolio.id,
      quantity: Math.floor(Math.random() * 20) + 1, // Random quantity between 1 and 20
      rate: Math.random() * 150 + 50 // Random rate between 50 and 200
    }));
  });

  // Insert the generated sample data into the database
  await Portfolio.bulkCreate(portfolios as Portfolio[]);
  await Share.bulkCreate(shares as Share[]);
  await Transaction.bulkCreate(transactions as Transaction[]);

  // Log completion message
  logger.info('Database initialized with sample data!');
};
