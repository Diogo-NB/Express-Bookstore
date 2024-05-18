import path from 'path';
import rootDir from '../util/path';
import fs from 'fs/promises';
import Cart from './cart';

const filePath = path.join(path.dirname(rootDir), 'data', 'products.json');

export default class Product {

    constructor(
        public title: string,
        public imageUrl: string,
        public description: string,
        public price: number,
        public id?: string | undefined,
    ) { }

    toString() {
        return `Title: ${this.title}\nImage URL: ${this.imageUrl}\nDescription: ${this.description}\nPrice: ${this.price}`;
    }

    async save() {
        console.log(`Saving product...\n${this.toString()}`);
        try {
            const products = await Product.fetchAll();
            if (this.id) {
                const existingProductIndex = products.findIndex(p => p.id === this.id);
                products[existingProductIndex] = this;
            } else {
                this.id = Math.random().toString();
                products.push(this);
            }
            await fs.writeFile(filePath, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
    };

    async delete() {
        if (this.id) {
            await Product.deleteById(this.id);
        }
    }

    static async deleteById(id: string) {
        console.log('Deleting product... ');

        try {
            const products = await Product.fetchAll();
            const updatedProducts = products.filter(p => p.id !== id);
            await fs.writeFile(filePath, JSON.stringify(updatedProducts));
            await Cart.removeProduct(id);
        } catch (error) {
            console.log("Error when deleting product: ", error);
        }
    }

    static async fetchAll(): Promise<Product[]> {
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(fileContent) as Product[];
        } catch (error) {
            console.log('Error fetching products, returning an empty array and clearing cart ...');
            console.log(error);
            await Cart.clearCart();
            return [];
        }
    }

    static async findById(id: string): Promise<Product | undefined> {
        return (await Product.fetchAll()).find(p => p.id === id);
    }

}