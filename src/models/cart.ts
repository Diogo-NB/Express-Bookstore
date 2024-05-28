import Product from "./product";
import rootDir from "../util/path";
import path from "path";
import fs from "fs/promises";
import { Document, WithId } from "mongodb";

const filePath = path.join(path.dirname(rootDir), "data", "cart.json");

type CartItem = {
  product: Product;
  qty: number;
};

export default class Cart {
  private constructor(private items: CartItem[]) {}

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

  get totalPrice() {
    const prices = this.items.map((item) => item.product.price * item.qty);
    return prices.reduce((total, price) => (total += price), +0.0);
  }
}
