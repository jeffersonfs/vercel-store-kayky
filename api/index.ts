import { PrismaClient } from '@prisma/client';
import { ZenStackMiddleware } from '@zenstackhq/server/express';
import RestApiHandler from '@zenstackhq/server/api/rest';
import express from 'express';

import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

const options = { customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.css' };
const spec = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../jogo-api.json'), 'utf8')
);

const app = express();
app.use(express.json());

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(spec, options));

const prisma = new PrismaClient();

// create a RESTful-style API handler
const apiHandler = RestApiHandler({ endpoint: 'http://localhost:3000/api' });

app.use('/api', ZenStackMiddleware({ 
    getPrisma: () => prisma,
    handler: apiHandler 
}));

export default app;

