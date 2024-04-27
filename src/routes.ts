import http from 'node:http';
import fs from 'node:fs';

export module routes {
    export const requestHandler = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
        const url = req.url;
        const method = req.method;
        if (url === '/' && method == 'GET') {
            const htmlPage = `<html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Message</title>
            </head>
            
            <body>
                <form action="/message" method="POST">
                    <input type="text" name="message">
                    <button type="submit">Send</button>
                </form>
            </body>
            
            </html>`;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(htmlPage);
            res.end();
            return;
        }

        if (url === '/' && method == 'POST') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end();
            return;
        }

        if (url === '/message' && method === 'POST') {
            const body = <any>[];
            req.on('data', (chunk) => {
                console.log(chunk);
                body.push(chunk);
            });
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                console.log(parsedBody);
                const message = parsedBody.split('=')[1];
                res.writeHead(302, { 'Location': '/' });
                res.end();
                fs.writeFile('generated/message.txt', message, err => err != null ? console.log(err) : null);
                return;
            });
            return;
        }

        return res.end();
    }
}
