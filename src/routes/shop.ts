import express from 'express';
import ProductsController from '../controllers/products'

export const router = express.Router();

router.get('/', ProductsController.getShop);