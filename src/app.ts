import express, { Application } from 'express';
import cors from 'cors';
import { ProductsRoutes } from './app/modules/products/products.route';
import { OrderRoutes } from './app/modules/orders/orders.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', ProductsRoutes);
app.use('/api', OrderRoutes);

// 404 Not Found handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
