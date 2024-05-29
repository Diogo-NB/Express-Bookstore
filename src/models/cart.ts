import Product from "./product";
import rootDir from "../util/path";
import path from "path";
import fs from "fs/promises";
import { Document, ObjectId, WithId } from "mongodb";

const filePath = path.join(path.dirname(rootDir), "data", "cart.json");

export type CartItem = {
  productId: ObjectId;
  qty: number;
};

export default class Cart {
  private constructor(public items: CartItem[]) {}

  static fromJson(json: Document | any): Cart {
    if (json) {
      const { items } = json;
      return new Cart(items);
    } else {
      return new Cart([]);
    }
  }

  get isEmpty() {
    return this.items.length == 0;
  }

  async getCartProducts(): Promise<
    {
      product: Product;
      qty: number;
    }[]
  > {
    const productsIds = this.items.map((item) => item.productId);
    return Product.findByIds(productsIds).then((products) =>
      products.map((product) => {
        const qty = this.items.find((item) =>
          item.productId.equals(product._id)
        )?.qty;

        return {
          product: product,
          qty: qty ?? 1,
        };
      })
    );
  }

  toString() {
    return `Cart-Items = [ ${this.items.map(
      (item) => `{ ProductId: ${item.productId}, qty: ${item.qty} }`
    )} ]`;
  }
}
