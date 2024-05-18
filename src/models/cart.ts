import Product from "./product";
import rootDir from "../util/path";
import path from "path";
import fs from "fs/promises";

const filePath = path.join(path.dirname(rootDir), 'data', 'cart.json');

type ProductInCart = {
    product: Product,
    qty: number,
}

export default class Cart {

    private constructor(
        private products: ProductInCart[],
        private totalPrice: number
    ) { }

    static async addProduct(product: Product) {

        let cart = new Cart([{ product, qty: 1 }], +product.price);

        try {
            const fileContent = await fs.readFile(filePath);
            const cartJson = JSON.parse(fileContent.toString()) as { products: ProductInCart[], totalPrice: number };

            cart = new Cart(cartJson.products, +cartJson.totalPrice);

            const existingProductIndex = cart.products.findIndex(
                (p: ProductInCart) => p.product.id === product.id
            );

            console.log('Existing product index: ', existingProductIndex);

            if (existingProductIndex !== -1) {
                /// If product already exists in cart, increase quantity
                cart.products[existingProductIndex].qty++;
            } else {
                /// else add product to cart
                cart.products.push({ product: product, qty: 1 });
            }

            cart.totalPrice += +product.price;

        } catch (error: any) {
            console.log('Error fetching cart, creating a new one ...');
            console.log(error);
        } finally {
            console.log("Saving ", cart);
            await fs.writeFile(filePath, JSON.stringify(cart));
        }

    }
}