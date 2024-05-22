import db from '../util/database';

export default class Product {

    constructor(
        public title: string,
        public imageUrl: string,
        public description: string,
        public price: number,
        public id?: string | undefined,
    ) { }

    static fromJson(json: any): Product {
        const { title, imageUrl, description, price, id } = json;
        return new Product(title, imageUrl, description, price, id);
    }

    toString() {
        return `Title: ${this.title}\nImage URL: ${this.imageUrl}\nDescription: ${this.description}\nPrice: ${this.price}`;
    }

    async save() {
        if (this.id) {
            await db.execute(
                'UPDATE products SET title = ?, imageUrl = ?, description = ?, price = ? WHERE products.id = ?',
                [this.title, this.imageUrl, this.description, this.price, this.id]
            );
        } else {
            await db.execute(
                'INSERT INTO products (title, imageUrl, description, price) VALUES (?, ?, ?, ?)',
                [this.title, this.imageUrl, this.description, this.price]
            );
        }
    };

    async delete() {
        if (this.id) {
            await Product.deleteById(this.id);
        }
    }

    static async deleteById(id: string) {
        await db.execute('DELETE FROM products WHERE products.id = ?', [id]);
    }

    static async fetchAll(): Promise<Product[]> {
        const [rows, fieldData] = await db.execute('SELECT * FROM products');
        const products = (rows as any[]).map(Product.fromJson);
        return products;
    }

    static async findById(id: string): Promise<Product | undefined> {
        const [rows, fieldData] = await db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
        const products = (rows as any[]).map(Product.fromJson);
        return products.length > 0 ? products[0] : undefined;
    }

}