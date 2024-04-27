"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const admin_1 = require("./routes/admin");
const shop_1 = require("./routes/shop");
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/admin', admin_1.router);
app.use(shop_1.router);
app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found!</h1>');
});
// Create a local server to receive data from
app.listen(3000);
