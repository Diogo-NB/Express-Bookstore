import Product from '../models/product';

export default class ProductsController {

    static getAddProduct(_req: any, res: any, _next: any) {
        res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
    }

    static postAddProduct(req: any, res: any, _next: any) {
        const product = new Product(req.body.title);
        product.save();

        res.redirect('/');
    }

    static getShop(_req: any, res: any, _next: any) {
        Product.fetchAll().then((products) => {
            res.render('shop/product-list', { prods: products, pageTitle: 'Shop', path: '/' })
        });
    }

};
