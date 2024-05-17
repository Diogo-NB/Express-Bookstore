import express from 'express';
import ShopController from '../controllers/shop'

export const router = express.Router();

router.get('/', ShopController.getIndex);

router.get('/products', ShopController.getProducts);

router.get('/cart', ShopController.getCart);

router.get('/orders', ShopController.getOrders);

router.get('/checkout', ShopController.getCheckout);
