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

    static getCheckout(_req: any, res: any, _next: any) {
        res.render(
            'shop/checkout',
            { pageTitle: 'Checkout', path: '/checkout' }
        )
    }

};
