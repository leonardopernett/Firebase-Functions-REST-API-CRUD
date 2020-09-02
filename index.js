const functions = require('firebase-functions');
const express = require('express')

const app = express()


app.get('/hello-world',(req,res)=>{
  res.status(200).json({message:'hello wolrd'})
})

app.use(require('./router/product'))

exports.app = functions.https.onRequest(app);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
