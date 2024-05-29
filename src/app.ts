import express from "express";
import bodyParser from "body-parser";
import path from "path";
import rootDir from "./util/path";

import dotenv from "dotenv";
dotenv.config();

import { mongoConnect } from "./util/database";

import { router as adminRoutes } from "./routes/admin";
import { router as shopRoutes } from "./routes/shop";
import User from "./models/user";

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(rootDir, "public"))); /// Users can access public files

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.render("404", { pageTitle: "Page not found!", path: "404" });
});

// Create a local server to receive data from
mongoConnect((client) => {
  User.findById("665409a7cab48a918e678e48").then((user) => {
    if (user) User.userLoggedOn = user;
    console.log(user?.cart ?? '');
  });
  app.listen(3000);
});
