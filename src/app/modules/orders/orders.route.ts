import express from 'express';
import { OrderControllers } from './orders.controller';
// import { StudentControllers } from './student.controller';

const router = express.Router();

// 1. Create a New Product and 6. Search a product
router.post('/orders', OrderControllers.createOrder);

export const OrderRoutes = router;
