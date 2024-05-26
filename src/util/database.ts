import { Db, MongoClient } from "mongodb";

const _mongodbUrl = "YOUR_URl";

let _db: Db;

export const mongoConnect = (callback: (client: MongoClient) => void) => {
  MongoClient.connect(_mongodbUrl)
    .then((client) => {
      _db = client.db("express-store");
      console.log("Connected!");
      callback(client);
    })
    .catch(console.error);
};

export const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error("No database found!");
};
