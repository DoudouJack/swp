const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const admin = require('firebase-admin');
//var Post = require("../models/posts");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// DB Setup
var mongoose = require('mongoose');

var DATABASE_URL = process.env.DATABASE_URL || 'server-database:27017'
var DATABASE_NAME = 'sw-project'

mongoose.connect(`mongodb://${DATABASE_URL}/{DATABASE_NAME}`, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', function (error) {
  console.log(error);
  // If first connect fails because server-database isn't up yet, try again.
  // This is only needed for first connect, not for runtime reconnects.
  // See: https://github.com/Automattic/mongoose/issues/5169
  if (error.message && error.message.match(/failed to connect to server .* on first connect/)) {
    setTimeout(function () {
      mongoose.connect(`mongodb://${DATABASE_URL}/{DATABASE_NAME}`, { useNewUrlParser: true }).catch(() => {
        // empty catch avoids unhandled rejections
      });
    }, 20 * 1000);
  } else {
    // Some other error occurred.  Log it.
    console.error(new Date(), String(error));
  }
});

db.once("open", function(callback){
  console.log("Connection Succeeded");
});


/* FIREBASE */

admin.initializeApp({
  credential: admin.credential.cert({
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key:
    process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,'\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
});


module.exports = admin;

async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    
    if(decodedToken){
      req.body.uid = decodedToken.uid
      return next()
    } else {
      return res.status(401).send('Nicht Authorisiert!')
    }  
  } catch (e) {
    return res.status(401).send('Nicht Authorisiert!')
  }
}

// SERVER Setup
app.get('/', verifyToken, async(req, res) => {
  res.send("works");
});


app.listen(process.env.PORT || 8081)
