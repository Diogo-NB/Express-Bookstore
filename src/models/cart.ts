import Product from "./product";
import rootDir from "../util/path";
import path from "path";
import fs from "fs/promises";

const filePath = path.join(path.dirname(rootDir), "data", "cart.json");

type ProductInCart = {
  product: Product;
  qty: number;
};

export default class Cart {
  private constructor(
    private products: ProductInCart[],
    private totalPrice: number
  ) {}

  private static async fetchCart() {}

  static async getProducts() {}

  private async saveCart() {}

  static async clearCart() {}

  static async addProduct(product: Product) {}

  static async removeProduct(productId: string) {}
}
