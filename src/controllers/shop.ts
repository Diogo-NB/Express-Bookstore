import Product from '../models/product';

export default class ShopController {

    static getProducts(_req: any, res: any, _next: any) {
        Product.fetchAll().then((products) => {
            res.render(
                'shop/product-list',
                { prods: products, pageTitle: 'All products', path: '/products' }
            )
        });
    }

    static getProduct(req: any, res: any, _next: any) {
        const productId = req.params.productId;
        Product.findById(productId).then((product) => {
            if (!product) {
                return res.redirect('/');
            }
            res.render(
                'shop/product-detail',
                { product: product, pageTitle: product.title, path: 'shop/products' }
            )
        });
    }

    static getIndex(_req: any, res: any, _next: any) {
        Product.fetchAll().then((products) => {
            res.render(
                'shop/index',
                { prods: products, pageTitle: 'Shop', path: '/' }
            )
        });
    }

    static getCart(_req: any, res: any, _next: any) {
        res.render(
            'shop/cart',
            { pageTitle: 'Your Cart', path: '/cart' }
        )
    }

    static postCart(req: any, res: any, _next: any) {
        let id : string = req.body.productID;
        console.log(id);
        res.redirect('/cart');
    }

    static getCheckout(_req: any, res: any, _next: any) {
        res.render(
            'shop/checkout',
            { pageTitle: 'Checkout', path: '/checkout' }
        )
    }

    static getOrders(_req: any, res: any, _next: any) {
        res.render(
            'shop/orders',
            { pageTitle: 'Your Orders', path: '/orders' }
        )
    }

};
