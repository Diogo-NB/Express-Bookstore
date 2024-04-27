import express from 'express';
import bodyParser from 'body-parser';

import { router as adminRoutes } from './routes/admin';
import { router as shopRoutes } from './routes/shop';
import path from 'path';
import { rootDir } from './util/path'

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(rootDir, 'public'))); /// Users can access public files

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

// Create a local server to receive data from
app.listen(3000);