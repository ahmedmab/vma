import * as functions from 'firebase-functions';
//const universal = require(`${process.cwd()}/dist/vma/server/main.js`).app;
//export const ssr = functions.https.onRequest(universal);
import * as path from 'path';


const universal = require(path.resolve(__dirname, '../dist/vma/server/main')).app;

export const ssr = functions.runWith({ memory: "2GB", timeoutSeconds: 120 }).https.onRequest(universal());
