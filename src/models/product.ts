import { Document, ObjectId, WithId } from "mongodb";
import { getDb } from "../util/database";

export default class Product {
  public _id?: ObjectId;

  constructor(
    public title: string,
    public imageUrl: string,
    public description: string,
    public price: number,
    id?: string | ObjectId
  ) {
    if (id) {
      this._id = typeof id === "string" ? ObjectId.createFromHexString(id) : id;
    }
  }

  toString() {
    return `Title: ${this.title}\nImage URL: ${this.imageUrl}\nDescription: ${this.description}\nPrice: ${this.price}`;
  }

  static fromJson(json: WithId<Document>): Product {
    const { _id, title, imageUrl, description, price } = json;
    return new Product(title, imageUrl, description, price, _id);
  }

  async save() {
    const operation = this._id
      ? getDb()
          .collection("products")
          .updateOne({ _id: this._id }, { $set: this })
      : getDb().collection("products").insertOne(this);

    return operation
      .then(() => console.log("Product saved!"))
      .catch(console.log);
  }

  static async findById(id: ObjectId | string): Promise<Product | undefined> {
    if (typeof id === "string") {
      id = ObjectId.createFromHexString(id);
    }
    return getDb()
      .collection("products")
      .findOne({ _id: id })
      .then((product) => {
        if (!product) {
          return;
        }
        return Product.fromJson(product);
      });
  }

  static async fetchAll() {
    return getDb()
      .collection("products")
      .find()
      .toArray()
      .then((products) => products.map(Product.fromJson));
  }

  async delete() {
    if (this._id) Product.deleteById(this._id);
  }

  static async deleteById(id: ObjectId | string) {
    if (typeof id === "string") {
      id = ObjectId.createFromHexString(id);
    }
    return getDb()
      .collection("products")
      .deleteOne({ _id: id })
      .then(() => console.log("Product deleted!"))
      .catch(console.log);
  }
}
