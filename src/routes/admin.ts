import express from 'express';
import path from 'path';
// import rootDir from '../util/path';

export const router = express.Router();

export type Product = {
    title: string,
}

export const products: Product[] = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {docTitle: 'Add Product'});
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
    products.push(req.body as Product);
    res.redirect('/');
});