import { Share } from '../models/share';
import { logger } from '../utils/winstonLogger';

var cron = require('node-cron');

// Function to update share prices
export const updateSharePrices = async () => {
  try {
    const shares = await Share.findAll();
    const updatedShares = shares.map(share => {
      // Randomly update the price for simplicity
      const newPrice = parseFloat((Math.random() * 100 + 100).toFixed(2));
      return share.update({ price: newPrice });
    });

    await Promise.all(updatedShares);
    logger.info('Updated share prices at', new Date().toLocaleTimeString());
  } catch (error) {
    logger.error('Error updating share prices:', error);
  }
}

// Schedule the function to run every minute
cron.schedule('0 * * * *', () => {
  updateSharePrices();
});

logger.info('Hourly share price update scheduled.');
