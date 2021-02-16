import * as functions from 'firebase-functions';
const universal = require(`${process.cwd()}/dist/vma/server/main`).app();

export const ssr = functions.https.onRequest(universal);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
