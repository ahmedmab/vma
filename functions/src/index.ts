import * as functions from 'firebase-functions';
const universal = require(`${process.cwd()}/dist/vma/server/main.js`).app;
  export const ssr  = functions.runWith({timeoutSeconds: 400, memory: '2GB'}).https.onRequest(universal);
