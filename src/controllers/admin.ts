import Product from '../models/product';

export default class AdminController {

    static getAddProduct(_req: any, res: any, _next: any) {
        res.render(
            'admin/edit-product',
            { pageTitle: 'Add Product', path: '/admin/add-product' }
        );
    }

    static postAddProduct(req: any, res: any, _next: any) {
        const product = new Product(
            req.body.title,
            req.body.imageUrl,
            req.body.description,
            req.body.price
        );
        product.save();

        res.redirect('/');
    }

    static getEditProduct(req: any, res: any, _next: any) {
        res.render(
            'admin/edit-product',
            { pageTitle: 'Edit Product', path: '/admin/edit-product' },
        );
    }

    static getProducts(_req: any, res: any, _next: any) {
        Product.fetchAll().then((products) => {
            res.render(
                'admin/products',
                { prods: products, pageTitle: 'Admin Products', path: 'admin/products' }
            )
        });
    }

};
