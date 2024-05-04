import express from 'express';
import ProductsController from '../controllers/products';

export const router = express.Router();

router.get('/add-product', ProductsController.getAddProduct);

router.post('/add-product', ProductsController.postAddProduct);