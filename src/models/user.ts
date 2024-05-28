import { Document, ObjectId, WithId } from "mongodb";
import { getDb } from "../util/database";
import Product from "./product";
import Cart from "./cart";

export default class User {
  public _id?: ObjectId;

  static userLoggedOn: User;

  constructor(
    public name: string,
    public email: string,
    public cart: Cart,
    id?: ObjectId | string
  ) {
    if (id) {
      this._id = typeof id === "string" ? ObjectId.createFromHexString(id) : id;
    }
  }

  static fromJson(json: WithId<Document>): User {
    const { _id, name, email, cart } = json;
    const user = new User(name, email, Cart.fromJson(cart), _id);
    user.save();
    return user;
  }

  toString() {
    return `Username: ${this.name}\nEmail: ${this.email}`;
  }

  async save() {
    const operation = this._id
      ? getDb().collection("users").updateOne({ _id: this._id }, { $set: this })
      : getDb().collection("users").insertOne(this);

    return operation.then(() => console.log("User saved!")).catch(console.log);
  }

  static async findById(id: ObjectId | string): Promise<User | undefined> {
    if (typeof id === "string") {
      id = ObjectId.createFromHexString(id);
    }
    return getDb()
      .collection("users")
      .findOne({ _id: id })
      .then((user) => {
        if (!user) {
          return;
        }
        return User.fromJson(user);
      });
  }
}
