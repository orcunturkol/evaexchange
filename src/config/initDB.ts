import { Portfolio} from './../models/portfolio';
import { Share } from './../models/share';
import { Transaction } from './../models/transaction';
import { logger } from '../utils/winstonLogger';

export const initializeDatabase = async () => {

  // Check if data already exists
  const existingDataCount = await Promise.all([
    Portfolio.count(),
    Share.count(),
    Transaction.count()
  ]);

  if (existingDataCount.some(count => count > 0)) {
    logger.info('Database already initialized with sample data!');
    return;
  }
 
  // Sample portfolios
  const portfolios = Array.from({ length: 5 }, (_, i) => ({
    id: `portfolio${i + 1}`
  }));

  // Sample shares
  const shares = [
    { symbol: 'ABC', price: 100.00 },
    { symbol: 'DEF', price: 150.00 },
    { symbol: 'GHI', price: 200.00 }
  ];
  
  // Sample transactions for each portfolio
  const transactions = portfolios.flatMap(portfolio => {
    return ['ABC', 'DEF', 'GHI'].map(symbol => ({
      type: Math.random() > 0.5 ? 'BUY' : 'SELL',
      shareSymbol: symbol,
      portfolioId: portfolio.id,
      quantity: Math.floor(Math.random() * 20) + 1, // Random quantity between 1 and 20
      rate: Math.random() * 150 + 50 // Random rate between 50 and 200
    }));
  });

  await Portfolio.bulkCreate(portfolios as Portfolio[]);
  await Share.bulkCreate(shares as Share[]);
  await Transaction.bulkCreate(transactions as Transaction[]);

  logger.info('Database initialized with sample data!');
};
