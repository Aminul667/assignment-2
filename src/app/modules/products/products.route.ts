import express from 'express';
import { ProductControllers } from './products.contorller';
// import { StudentControllers } from './student.controller';

const router = express.Router();

// 1. Create a New Product and 6. Search a product
router.post('/products', ProductControllers.createProduct);

// 2. Retrieve a List of All Products
router.get('/products', ProductControllers.getProducts);

// 3. Retrieve a Specific Product by ID
router.get('/products/:productId', ProductControllers.getSingleProduct);

// 5. Delete a Product
router.delete('/products/:productId', ProductControllers.deleteProduct);

export const ProductsRoutes = router; // as router is an object itself
