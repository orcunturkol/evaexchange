import express from 'express';
import './tasks/sharePriceUpdater';
import tradeRoutes from './routes/tradeRoutes';
import { sequelize } from './config/database';
import { logger } from './utils/winstonLogger';
import { initializeDatabase } from './config/initDB';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

sequelize.sync()
.then(() => {
  logger.info('Database connected and models synchronized!');
}).then(initializeDatabase);

app.use('/trade', tradeRoutes);

app.get('/', (req, res) => {
  res.send('EvaExchange API is running!');
});

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
 