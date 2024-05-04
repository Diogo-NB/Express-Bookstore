import path from 'path';
import rootDir from '../util/path';
import fs from 'fs/promises';

const filePath = path.join(path.dirname(rootDir), 'data', 'products.json');

export default class Product {

    title: string;

    constructor(title: string) {
        this.title = title;
    }

    save() {
        fs.readFile(filePath).then((fileContent) => {
            let products = JSON.parse(fileContent.toString()) as Product[];
            products.push(this);
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

}

const products: Product[] = [];
