import Cart from '../models/cart';
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
        Cart.getProducts().then((cartProducts) => {
            res.render(
                'shop/cart',
                {
                    pageTitle: 'Your Cart',
                    path: '/cart',
                    cartProducts: cartProducts
                }
            )
        }).catch((error) => {
            console.log(error);
            res.redirect('/');
        });
    }

    static postCart(req: any, res: any, _next: any) {
        let id: string = req.body.productID;
        Product.findById(id).then((product) => {
            if (product) {
                Cart.addProduct(product).then(() => {
                    console.log('Product added to cart');
                }).catch(console.log);
            }
        });
        res.redirect('/cart');
    }

    static postCartDeleteProduct(req: any, res: any, _next: any) {
        const id = req.body.productId;
        Cart.removeProduct(id).then(() => {
            res.redirect('/cart');
        }).catch(console.log);
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
