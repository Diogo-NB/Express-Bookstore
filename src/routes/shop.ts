import express from 'express';
import path from 'path';
// import rootDir from '../util/path';
import { products } from '../routes/admin'

export const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('shop', { prods: products, docTitle: 'My Shop' });
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});