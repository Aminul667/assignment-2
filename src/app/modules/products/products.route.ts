import express from 'express';
import { ProductControllers } from './products.contorller';
// import { StudentControllers } from './student.controller';

const router = express.Router();

// 1. Create a New Product
router.post('/products', ProductControllers.createProduct);

// 2. Retrieve a List of All Products
router.get('/products', ProductControllers.getProducts);

// Retrieve a Specific Product by ID
router.get('/products/:productId', ProductControllers.getSingleProduct);

// router.delete('/:studentId', StudentControllers.deleteStudent);

export const ProductsRoutes = router; // as router is an object itself
