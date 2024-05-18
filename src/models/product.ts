import path from 'path';
import rootDir from '../util/path';
import fs from 'fs/promises';

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

    save() {
        console.log('Saving product... ' + this.toString());
        fs.readFile(filePath).then((fileContent) => {
            let products = JSON.parse(fileContent.toString()) as Product[];
            if (this.id) {
                const existingProductIndex = products.findIndex(p => p.id === this.id);
                products[existingProductIndex] = this;
            } else {
                this.id = Math.random().toString();
                products.push(this);
            }
            fs.writeFile(filePath, JSON.stringify(products)).catch(console.log);
        }).catch(console.log);
    };

    static async fetchAll(): Promise<Product[]> {
        try {
            const fileContent = await fs.readFile(filePath);
            return JSON.parse(fileContent.toString()) as Product[];
        } catch (message) {
            console.log(message);
            return [];
        }
    }

    static async findById(id: string): Promise<Product | undefined> {
        return (await Product.fetchAll()).find(p => p.id === id);
    }

}

const products: Product[] = [];
