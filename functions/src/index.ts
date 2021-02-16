import * as functions from 'firebase-functions';
const universal = require(`${process.cwd()}/dist/vma/server/main.js`).app;
export const ssr = functions.https.onRequest(universal);

