import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductsRoutes } from './app/modules/products/products.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductsRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

export default app;
