import * as functions from 'firebase-functions';
const universal = require(`${process.cwd()}/dist/vma/server/main`).app();
export const ssr  = functions.runWith({timeoutSeconds: 10, memory: '128MB'}).https.onRequest(universal);
 