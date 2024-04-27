import http from 'node:http';
import { routes } from './routes';

// Create a local server to receive data from
const server = http.createServer(routes.requestHandler);

server.listen(3000);