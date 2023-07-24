import * as functions from 'firebase-functions';
const universal = require(`${process.cwd()}/dist/vma/server/main`).app();
export const ssr  = functions.runWith({timeoutSeconds: 10, memory: '128MB'}).https.onRequest(universal);

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));
app.get('/sitemap.xml', (req:any, res:any) => res.sendFile(`${process.cwd()}/dist/vma/browser/sitemap.xml`));
app.get('/ads.txt', (req:any, res:any) => res.sendFile(`${process.cwd()}/dist/vma/browser/ads.txt`));
export const sitemap = functions.https.onRequest(app);
