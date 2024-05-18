import Product from '../models/product';

export default class AdminController {

    static getAddProduct(_req: any, res: any, _next: any) {
        res.render(
            'admin/edit-product',
            {
                pageTitle: 'Add Product',
                path: '/admin/add-product',
                editing: false
            }
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

        res.redirect('/admin/products');
    }

    static getEditProduct(req: any, res: any, _next: any) {
        const productId = req.params.productId as string;
        Product.findById(productId).then((product) => {
            if (!product) {
                return res.redirect('/');
            }
            res.render(
                'admin/edit-product',
                {
                    pageTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    editing: true,
                    product: product
                },
            );
        });
    }

    static postEditProduct(req: any, res: any, _next: any) {
        const updatedProduct = new Product(
            req.body.title,
            req.body.imageUrl,
            req.body.description,
            req.body.price,
            req.body.productId
        );
        updatedProduct.save().then(() => res.redirect('/admin/products'));
    }

    static postDeleteProduct(req: any, res: any, _next: any) {
        const productId = req.body.productId;
        Product.deleteById(productId).then(() => res.redirect('/admin/products'));
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
