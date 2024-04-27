"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const routes_1 = require("./routes");
// Create a local server to receive data from
const server = node_http_1.default.createServer(routes_1.routes.requestHandler);
server.listen(3000);
