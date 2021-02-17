import * as functions from 'firebase-functions';
const universal = require(`${process.cwd()}/dist/vma/server/main.js`).app;
//export const ssr = functions.https.onRequest(universal);

  export const ssr  = functions
    .runWith({
        timeoutSeconds: 300,
        memory: '1GB'
    })
    .https.onRequest(universal);
