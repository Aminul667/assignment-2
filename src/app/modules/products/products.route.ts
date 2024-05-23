import express from 'express';
import { ProductControllers } from './products.contorller';
// import { StudentControllers } from './student.controller';

const router = express.Router();

// it calls controller
router.post('/products', ProductControllers.createProduct);

// router.get('/', StudentControllers.getAllStudents);

// router.get('/:studentId', StudentControllers.getSingleStudent);

// router.delete('/:studentId', StudentControllers.deleteStudent);

export const ProductsRoutes = router; // as router is an object itself
